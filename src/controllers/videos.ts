import Express from "express";
import { Request, Response } from "express";
import { getConnection, Repository } from "typeorm";
import { Video } from "../entity/video";
import { Material } from "../entity/material";
import AWS from "aws-sdk";
import Multer from "multer";
import MulterS3 from "multer-s3";

const router = Express.Router();

/*

    Upload video endpoint

*/

const s3 = new AWS.S3({
    region: 'us-east-1',
});

const videoUpload = Multer({
    storage: MulterS3({
        s3,
        acl: 'public-read',
        bucket: 'unravel-foundation-source71e471f1-pp7azgexeegs',
        metadata: (req, file, cb) => {
            cb(null, { fieldname: file.fieldname });
        },
        key: (req, file, cb) => {
            cb(null, "assets01/" + Date.now().toString() + "-" + file.originalname);
        }
    }),
});

router.post("/material/:id/upload", videoUpload.single("video"), async (req: Request, res: Response) => {
    try {
        const fileName = (req.file as any).key;
        const videosRepository = getConnection().getRepository(Video);

        const newVideo = await videosRepository.save({ fileName: fileName.split("/")[1] });

        const materialsRepository = getConnection().getRepository(Material);

        const material = await materialsRepository.findOne(req.params.id);

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

/*

    Generate URL endpoint

*/


/*

    Job completed endpoint

*/

export default router;
