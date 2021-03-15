import Express from "express";
import { getConnection, Repository } from "typeorm";
import { User } from "../entity/user";
import { isEmail } from "../helpers/validations";
import { comparePassword, generateAccessToken } from "../helpers/authentication"
const router = Express.Router();

// login user
router.post("/", async (req: Express.Request, res: Express.Response) => {
    try {
        const { email, password } = req.body;
        // validation
        if (!isEmail(email) || !password) {
            res.status(401).json({
                message: "Invalid Email or Password"
            });
        }
        const user: User = await getConnection().getRepository(User).findOne({ email });
        if (!user) {
            res.status(401).json({
                message: "Invalid Credentials"
            });
        }

        // authentication
        if (!comparePassword(password, user.passwordHash)) {
            res.status(401).json({
                message: "Invalid Credentials"
            });
        }
        // -Generate access token
        const accessToken = generateAccessToken(user);

        res.status(200).json({
            message: "Logged In Succesfully.",
            data: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                isTeacher: user.isTeacher,
                educationEntityName: user.educationEntityName,
                concentration: user.concentration,
                gender: user.gender,
                dob: user.dob,
            },
            accessToken,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

export default router;
