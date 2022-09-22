import { Request, Response, NextFunction } from "express";
import { verifyToken } from "@/utils/token";
import userModel from "@/resources/user/user.model";
import Token from "@/utils/interfaces/token.interface";
import HttpException from "@/utils/exceptions/http.exception";
import jwt from "jsonwebtoken";

async function authenticateMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
    const bearer = req.headers.authorization;

    //bearer token not provided
    if (!bearer || bearer.startsWith('Bearer ')) {
        return next(new HttpException(401,'unauthorised'));
    }

    const accessToken = bearer.split('Bearer: ')[1].trim();

    try {
        const payload: Token | jwt.JsonWebTokenError = await verifyToken(accessToken);

        if (payload instanceof jwt.JsonWebTokenError) {
            return next(new HttpException(401,'unauthorised'));
        }

        const user = await userModel.findById(payload.id).select('-password').exec();

        if (!user) {
            return next(new HttpException(401,'unauthorised'));
        }
        req.user = user;
        return next();
    } catch (error) {
        return next(new HttpException(401,'unauthorised'));
    }
}

export default authenticateMiddleware;