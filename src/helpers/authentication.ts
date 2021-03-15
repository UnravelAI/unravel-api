import bcrypt from "bcryptjs";
import { User } from "../entity/user";
import jwt, { verify } from "jsonwebtoken"

const comparePassword = (password: string, passwordHash: string): boolean => {
    if (bcrypt.compareSync(password, passwordHash)) {
        return true;
    }
    return false;
}

const generateAccessToken = (user: User): string => {
    const payload = {
        id: user.id,
    }
    return (jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "10h" }))
}

const verifyAccessToken = (accessToken: string, ignoreExpiration: boolean) => {
    return new Promise((resolve, reject) => {
        jwt.verify(
            accessToken,
            process.env.TOKEN_SECRET,
            {
                ignoreExpiration
            },
            (error: Error, user: User) => {
                if (error) {
                    reject(error);
                }
                resolve(user.id);
            }
        )
    });
}

export {
    comparePassword,
    generateAccessToken,
    verifyAccessToken,
}