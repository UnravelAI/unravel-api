import Express from "express";
import { Request, Response } from "express";
import { getConnection, Repository } from "typeorm";
import { Course } from "../entity/course";
import { User } from "../entity/user";
import materialsController from "./materials";

const router = Express.Router();

// routes
router.use("/:course_id/materials", materialsController);

// submit course
router.post("/", async (req: Request, res: Response) => {
    try {
        const course: Course = req.body;
        const courseUser: User = new User();
        courseUser.id = res.locals.id;
        course.user = courseUser;

        // validate types
        if (typeof course.name !== "string" || isNaN(course.user.id)) {
            return res.status(400).json({
                message: "Validation errors occured",
            });
        }
        // save user's course
        const courseRepository: Repository<Course> = await getConnection().getRepository(Course);
        const newcourse: Course = await courseRepository.save(course);
        return res.status(201).json({
            message: "course created successfully",
            data: newcourse,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});

// fetch all courses
router.get("/", async (req: Request, res: Response) => {
    try {
        const courseUser: User = new User();
        courseUser.id = res.locals.id;

        // retrieve user's courses
        const courseRepository: Repository<Course> = await getConnection().getRepository(Course);
        const courses = await courseRepository.find({
            where: { user: courseUser },
            relations: ["materials",]
        });
        return res.status(200).json({
            message: "courses Retreived successfully",
            data: courses,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        })
    }
});

// fetch specific course
router.get("/:id", async (req: Request, res: Response) => {
    try {
        // retrieve single course
        const courseId = req.params.id;

        // retrieve course
        const courseRepository: Repository<Course> = await getConnection().getRepository(Course);
        const course = await courseRepository.findOne(courseId, {
            relations: ["materials"],
        });
        if (!course) {
            return res.status(404).json({
                message: "Error: course not found",
            });
        }
        return res.status(200).json({
            message: "courses Retreived successfully",
            data: course,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        })
    }
});


export default router;