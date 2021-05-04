import Express from "express";
import { Request, Response } from "express";
import { getConnection, Repository } from "typeorm";
import { Material } from "../entity/material";
import { User } from "../entity/user";
import { Course } from "../entity/course";
import videosController from "./videos";
import documentsController from "./documents";

const router = Express.Router({
    mergeParams: true, // retrieve params from previous middle wares
});
// routes
router.use("/:material_id/video", videosController);
router.use("/:material_id/document", documentsController);

// submit material
router.post("/", async (req: Request, res: Response) => {
    try {
        const material: Material = req.body;
        const materialUser: User = new User();
        const course: Course = new Course();
        materialUser.id = res.locals.id;
        course.id = req.params.course_id ? Number(req.params.course_id) : null;
        material.user = materialUser;
        material.course = course;

        // validate types
        if (
            typeof material.title !== "string" ||
            typeof material.description !== "string" ||
            isNaN(material.user.id)
        ) {
            return res.status(400).json({
                message: "Validation errors occured",
            });
        }

        // save user's material
        const materialRepository: Repository<Material> = await getConnection().getRepository(Material);
        const newMaterial: Material = await materialRepository.save(material);
        return res.status(201).json({
            message: "Material created successfully",
            data: newMaterial,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});

// fetch all materials
router.get("/", async (req: Request, res: Response) => {
    try {
        const materialUser: User = new User();
        materialUser.id = res.locals.id;

        // retrieve user's materials
        const materialRepository: Repository<Material> = await getConnection().getRepository(Material);
        const materials = await materialRepository.find({
            where: { user: materialUser },
            relations: ["video", "document"],
        });
        return res.status(200).json({
            message: "Materials Retreived successfully",
            data: materials,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        })
    }
});

// fetch specific material
router.get("/:id", async (req: Request, res: Response) => {
    try {
        // retrieve single material
        const materialId = req.params.id;

        // retrieve material
        const materialRepository: Repository<Material> = await getConnection().getRepository(Material);
        const material = await materialRepository.findOne(materialId, {
            relations: ["video", "document"],
        });
        if (!material) {
            return res.status(404).json({
                message: "Error: material not found",
            });
        }
        return res.status(200).json({
            message: "materials Retreived successfully",
            data: material,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        })
    }
});


export default router;
