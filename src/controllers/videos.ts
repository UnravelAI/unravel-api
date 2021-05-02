import Express from "express";
import { Request, Response } from "express";
import { getConnection } from "typeorm";
import { Video } from "../entity/video";
import { Material } from "../entity/material";
import { videoUpload } from "../helpers/fileUpload";

const router = Express.Router();

/*

    Upload video endpoint

*/
router.post("/", videoUpload.single("video"), async (req: Request, res: Response) => {
    try {
        const fileName = (req.file as any).key;
        const videosRepository = getConnection().getRepository(Video);

        const newVideo = await videosRepository.save({ fileName: fileName.split("/")[1] });

        const materialsRepository = getConnection().getRepository(Material);

        const material = await materialsRepository.findOne(req.params.material_id);

        material.video = newVideo;

        await materialsRepository.save(material);

        res.status(200).json({
            message: "File uploaded succesfully",
            video: newVideo
        });
    } catch (error) {
        res.status(500).json({
            message: "An unexpected error occured"
        });
    }
});

export default router;
