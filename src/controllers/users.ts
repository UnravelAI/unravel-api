import Express from "express";
import { getConnection, Repository } from "typeorm";
import { User } from "../entity/user";
import { checkIfExists, validateUserFields, UniqueUserElements } from "../helpers/users"
import bcrypt from "bcryptjs";

const router = Express.Router();


// create new user
router.post("/", async (req: Express.Request, res: Express.Response) => {
    try {
        const user: User = req.body;
        // Generate hash and salt from password
        user.passwordSalt = bcrypt.genSaltSync(10); 
        user.passwordHash = bcrypt.hashSync(req.body.password, user.passwordSalt);
        const validationErrors: string[] = validateUserFields(user);
        const uniqueElements: UniqueUserElements = {
            email: user.email,
            passwordSalt: user.passwordSalt,
        }
        if (validationErrors.length !== 0) {
            return res.status(400).json({
                message: "Validation errors occured",
                errors: validationErrors,
            });
        }
        const uniqueElementsErrors: string[] = await checkIfExists(uniqueElements);
        if (uniqueElementsErrors.length !== 0) {
            return res.status(400).json({
                message: "Unique errors occured",
                errors: uniqueElementsErrors,
            });
        }
        const userRepository: Repository<User> = await getConnection().getRepository(User);
        const newUser: User = await userRepository.save(user);
        return res.status(201).json({
            message: "User created successfully",
            data: newUser,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});

// read all users
router.get("/", async (req: Express.Request, res: Express.Response) => {
    try {
        const userRepository: Repository<User> = await getConnection().getRepository(User);
        const users: User[] = await userRepository.find()
        return res.status(201).json({
            message: "Users Retreived successfully",
            data: users,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});

// read all users
router.delete("/:id", async (req: Express.Request, res: Express.Response) => {
    try {
        const userRepository: Repository<User> = await getConnection().getRepository(User);
        await userRepository.delete(req.params.id);
        return res.status(201).json({
            message: "User deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});

export default router;
