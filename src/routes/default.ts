import Express from "express";
const router = Express.Router();


// middleware
import authenticateUser from "../middleware/authenticateUser"

// import controllers
import Users from "../controllers/users";
import Login from "../controllers/login";



// route controllers
router.use("/users", Users);
router.use("/login", Login);


export default router;
