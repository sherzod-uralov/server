import { Request,Response } from "express"
import { List } from "../models/lists/list.model";
import { unCode } from "../helpers/jwt.helper";
import { List_todo } from "../models/list_todo/list_todo.model";

const getAllLists = async (req:Request,res:Response) => {
    try {
        const token = (req as any).token;

        const openedToken = unCode(token);        
        
        const list = await List.findAll({ where:{user_id:(openedToken as any).user_id},
            include: List_todo 
        });

        res.status(200).json({
            status:200,
            msg:'OK',
            data:list
        })

    } catch (error) {
        console.log(error);
        
        res.status(500).send('internal server error');

    }
} 



const addList = async (req:Request,res:Response) => {
    try {
        
        const {list_name} = req.body;
        const token = (req as any).token;

        if(!list_name){
            return res.status(400).json({
                status:400,
                msg:'malumot kiritilmagan' 
            })
        } 
        const openedToken = unCode(token);


        const newList = await List.create({list_name,user_id:(openedToken as any).user_id});

        res.status(200).json({ 
            status:200,
            msg:'OK',
            data:newList
        })
        
    } catch (error) {
        
        res.status(500).send('internal server error');

    }
}

const deleteList = async (req:Request,res:Response) => {
    try {

        const {id} = req.params;
        const token = (req as any).token;

        const openedToken = unCode(token);

        const checkUser = await List.findOne({where:{list_id:id}});

        if(checkUser?.user_id !== (openedToken as any).user_id){
            return res.status(400).json({
                    status:400,
                    msg:`You can only delete your own list`
            })
        }

        const deleteList = await List.destroy({where:{list_id:id}}); 

        await List_todo.destroy({ where: { list_id: id } });

        return res.status(200).json({
            status:200,
            delete_id:id,
            msg:`list successfully deleted`,
            deleted: deleteList 
    })

    } catch (error) {
        
        res.status(500).send('internal server error');
        

    }
}


const updateList = async (req:Request,res:Response) => {
    try {
        const {list_name,IsrenameIng} = req.body;
        const {id} = req.params;
        const token = (req as any).token;

        const openedToken = unCode(token);

        const checkUser = await List.findOne({where:{list_id:id}});

        if(checkUser?.user_id !== (openedToken as any).user_id){
            return res.status(400).json({ 
                    status:400,
                    msg:`You can only updated your own list`
            })
        }

        const updatedList = await List.update({list_name,IsrenameIng},{where:{list_id:id}}); 

        return res.status(200).json({
            status:200,
            update_id:id,
            msg:`list successfully updated`,
            updated: updatedList 
    })

    } catch (error) {
        
        res.status(500).send('internal server error');
        

    }
}

const singleList = async (req:Request,res:Response) => {
    try {
        const id = req.params.id;
        const list = await List.findAll({where:{list_id:id},
            include: [List_todo]
        });
        const token = (req as any).token;       

        res.status(200).json({
            status:200,
            msg:'OK',
            data:list[0]
        })

    } catch (error) {
        
        res.status(500).send('internal server error');
        
    }
}

export {getAllLists,addList,deleteList,updateList,singleList};


