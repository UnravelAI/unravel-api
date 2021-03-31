import Express from "express";
const router = Express.Router();

// import controllers
import Videos from "../controllers/cloud/videos";



// route controllers
router.use("/cloud/video", Videos);

export default router;
