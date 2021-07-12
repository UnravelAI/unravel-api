import Express from "express";
import { getConnection, Repository } from "typeorm";
import { User } from "../entity/user";
import { Course } from "../entity/course";
import { Material } from "../entity/material";
import courses from "./courses";
import { Request, Response } from "express";

const router = Express.Router({
    mergeParams: true, // retrieve params from previous middle wares
});

router.post("/enroll/:code", async (req: Request, res: Response) => {
    try{
        const courseCode = req.params.code;
        const courseRepository: Repository<Course> = await getConnection().getRepository(Course);
        const course: Course = await courseRepository.findOne({code:courseCode});
        const userID = res.locals.id;

        if(!course){
            return res.status(404).json({
                message: "Error: course not found",
            })
        }
        const userRepository: Repository<User> = await getConnection().getRepository(User);
        const student: User = await userRepository.findOne(userID,{ relations: ["enrolled"] });

        student.enrolled=[...student.enrolled,course];

        userRepository.save(student);
        return res.status(201).json({
            message: "Student enrolled to course",
            data: student,
        });
    }catch (error){
        return res.status(500).json({
            message: error.message,
        });
    }
});

router.get("/courses", async (req: Request, res: Response) => {

    try{
        const userID = res.locals.id;
        const userRepository: Repository<User> = await getConnection().getRepository(User);
        const student: User = await userRepository.findOne(userID,{ relations: ["enrolled"] });
        const courseRepository: Repository<Course> = await getConnection().getRepository(Course);
        const newEnrolled = student.enrolled.map( async (course:Course)=>{
            const courseWMaterial: Course = await courseRepository.createQueryBuilder('course').select([
                'course.id',
                'course.name',
            ]).loadRelationCountAndMap('course.materials', 'course.materials').where('course.id = :courseid', { courseid: course.id }).getOne();
            return courseWMaterial;
        });
        const ans = await Promise.all(newEnrolled);
        return res.status(201).json({
            message: "Courses Retreived successfully",
            data: ans,
        });

    }catch (error){
        return res.status(500).json({
            message: error.message,
        });
    }
});

router.get("/course/:id/materials", async (req: Request, res: Response) => {
    try{
        const courseId = req.params.id;
        const materialRepository: Repository<Material> = await getConnection().getRepository(Material);
        const materials = await materialRepository.find({
            where: { course: courseId },
            order: { updatedAt: 'DESC' },
            relations: ["video", "document"],
        });
        for( let i = 0; i < materials.length; i++){
            if (!( materials[i].video && materials[i].video.status==="published")) {
                materials.splice(i, 1);
                i--;
            }
        }
        return res.status(200).json({
            message: "courses Retreived successfully",
            data: materials,
        });

    }catch (error){
        return res.status(500).json({
            message: error.message,
        });
    }
});

export default router;