import { verifyAccessToken } from '../helpers/authentication';
import { Request, Response, NextFunction } from 'express'

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken: string = req.headers.authorization;
        const id = await verifyAccessToken(accessToken, false);
        res.locals.id = id;
        next();
    }
    catch (error) {
        res.status(401).json(error);
    }
}