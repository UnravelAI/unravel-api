import Express from "express";
import { Request, Response } from "express";
import { getConnection } from "typeorm";
import { Document } from "../entity/document";
import { Material } from "../entity/material";
import { documentUpload } from "../helpers/fileUpload";

const router = Express.Router();

/*

    Upload document endpoint

*/
router.post("/", documentUpload.single("documentName"), async (req: Request, res: Response) => {
    try {
        const fileName = (req.file as any).key;
        const fileUrl: string = `https://d10n7efzl01lxo.cloudfront.net/${fileName}`;
        const materialId: string = req.params.material_id;

        const materialsRepository = getConnection().getRepository(Material);
        const documentRepository = getConnection().getRepository(Document);
        const material = await materialsRepository.findOne(materialId);

        const newDocument = await documentRepository.save({
            fileName: fileName.split("/")[1],
            fileUrl,
            material,
        });
        res.status(201).json({
            message: "File uploaded succesfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "An unexpected error occured"
        });
    }
});


export default router;
