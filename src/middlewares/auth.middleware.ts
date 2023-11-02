import { NextFunction,Request,Response} from "express";
import { unCode } from "../helpers/jwt.helper";

const authMiddleWare = async (req:Request,res:Response,next:NextFunction) => {
    try {
        
        const token = req.headers.authorization;

        if(!token){
            return res.status(403).json({
                status:403,
                msg:"token is not available"
            })
        }

        const checkToken = unCode(token);

        if(!checkToken){
            return res.status(403).json({
                status:403,
                msg:"the token is invalid or expired"
            })
        }

        (req as any).token = token;

        return next()

    } catch (error) {
        
        console.log(error);
        
    }
}

export {authMiddleWare}