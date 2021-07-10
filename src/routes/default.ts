import Express from "express";
const router = Express.Router();

// import controllers
import Users from "../controllers/users";
import Login from "../controllers/login";
import Students from "../controllers/students";
import authenticateUser from "../middleware/authenticateUser";


// route controllers
router.use("/users", Users);
router.use("/login", Login);
router.use("/student",authenticateUser, Students);

export default router;
