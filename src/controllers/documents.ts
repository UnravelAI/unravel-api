import Express from "express";
import { Request, Response } from "express";
import { getConnection } from "typeorm";
import { Document } from "../entity/document";
import { Material } from "../entity/material";
import { documentUpload } from "../helpers/fileUpload";

const router = Express.Router({
    mergeParams: true, // retrieve params from previous middle wares
});
/*

    Upload document endpoint

*/
router.post("/", documentUpload.single("documentName"), async (req: Request, res: Response) => {
    try {
        const fileName = (req.file as any).key;
        const fileUrl: string = `https://d10n7efzl01lxo.cloudfront.net/${fileName}`;
        const materialId: string = req.params.material_id;
        const documentRepository = getConnection().getRepository(Document);
        const material = new Material();
        material.id = Number(materialId);

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
            message: "An unexpected error occured",
            error,
        });
    }
});


export default router;
