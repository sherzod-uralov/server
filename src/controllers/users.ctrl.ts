import { User } from "../models/users/users.model";
import { Request,Response } from "express";
import path from 'path';
import fs from 'fs';
import { unCode } from "../helpers/jwt.helper";

const userPRofileUpdate = async (req:Request,res:Response) => {
    try {
        
        const {username} = req.body;
        const file = req.file;
        
        
        const token = (req as any).token; 

        const openedToken = unCode(token); 
        const findUser = await User.findByPk((openedToken as any).user_id);

        await User.update({
            profile_image: `/uploads/${file?.filename}`,
            username 
        }, 
        {
            where:{
                user_id:(openedToken as any).user_id
            }
        }
        )

        res.status(200).json({ 
            status:200,
            msg:"successfuly"
        })
        

    } catch (error) {
        
        console.log(error);
        
        res.status(500).send('internal server error');

    }
}

const getPRofileInformation = async (req:Request,res:Response) => {
    try {

        const token = (req as any).token;

        const openedToken = unCode(token);

        const findUser = await User.findByPk((openedToken as any).user_id);

        res.status(200).json({ 
            status:200,
            msg:"successfuly",
            information:findUser
        })
        
    } catch (error) {
      return res.status(500).send('internal server error');
    }
}

const allUsers = async (req:Request,res:Response) => {
    try {
        const findUser = await User.findAll();

        res.status(200).json({ 
            status:200,
            msg:"successfuly",
            information:findUser
        })
        
    } catch (error) {
      return res.status(500).send('internal server error');
    }
}

export {userPRofileUpdate,getPRofileInformation,allUsers}; 