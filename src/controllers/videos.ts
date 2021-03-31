import Express from "express";
import { Request, Response } from "express";
import { getConnection, Repository } from "typeorm";

const router = Express.Router();


/*

    Upload video endpoint

*/

router.post("/upload", async (req: Request, res: Response) => {
    res.send("hello");
});

/*

    Generate URL endpoint

*/


/*

    Job completed endpoint

*/

export default router;
