import Express from "express";
const router = Express.Router();

// import controllers
import Videos from "../controllers/cloud/videos";
import textAnalysis from "../controllers/cloud/textAnalysis";


// route controllers
router.use("/cloud/video", Videos);
router.use("/cloud/analysis", textAnalysis);

export default router;
