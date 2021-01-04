import Express from "express";
const router = Express.Router();


// import controllers
import Users from "../controllers/users";



// route controllers
router.use("/users", Users);


export default router;
