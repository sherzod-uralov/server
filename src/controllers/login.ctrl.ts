import { Response,Request } from "express"
import { User } from "../models/users/users.model"
import bcrypt from 'bcrypt'
import { deCode } from "../helpers/jwt.helper";

const login = async (req:Request,res:Response) => {
    try {
        
        const {email,password,username} = req.body;
        
        const checkUser = await User.findOne({where:{email}});

        if(!checkUser){
            return res.status(400).json({
                status:400,
                msg:'username notfound',
                data:null
            })
        }

        const checkPasswd = await bcrypt.compare(password.toString(),(checkUser.password).toString()); 

        if(!checkPasswd){
            return res.status(400).json({
                status:400,
                msg:'wrong password',
                data:null
            })
        }
        else{
            const obj = {
                email,
                username:(checkPasswd as any).username,
                user_id:checkUser.user_id
            }
            const newToken = deCode(obj);

            return res.status(200).json({
                status:200,
                msg:'logged',
                token:newToken
            })
        }

    } catch (error) {
        
        res.status(500).json({ status: 500, msg: 'Internal server error' });
        
    }
}

export {login}