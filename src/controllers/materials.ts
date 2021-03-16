import Express from "express";
import { Request, Response } from "express";
import { getConnection, Repository } from "typeorm";
import { Material } from "../entity/material";
import { User } from "../entity/user";

const router = Express.Router();

router.post("/", async (req: Request, res: Response) => {
    try {
        const material: Material = req.body;
        const materialUser: User = new User();
        materialUser.id = res.locals.id;
        material.user = materialUser;

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

router.get("/", async (req: Request, res: Response) => {
    try {
        const materialUser: User = new User();
        materialUser.id = res.locals.id;

        // retrieve user's materials
        const materialRepository: Repository<Material> = await getConnection().getRepository(Material);
        const materials = await (await materialRepository.find({ where: { user: materialUser } })).reverse();
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


export default router;
