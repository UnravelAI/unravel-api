import Express from "express";
import { Request, Response } from "express";
import { getConnection, Repository } from "typeorm";
import { Video } from "../../entity/video";

const router = Express.Router();


/*

    Generate URL endpoint

*/


// Set video upload job status
router.put("/jobStatus", async (req: Request, res: Response) => {
    try {
        const fileName: string = req.body.fileName;

        // update jobStatus for the specified file
        const videoRepository: Repository<Video> = await getConnection().getRepository(Video);
        await videoRepository.update({ fileName }, { jobCompleted: true });

        return res.status(200).json({
            message: `jobStatus updated successfully for video: ${fileName}`,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});

export default router;
