
import { unCode } from "../helpers/jwt.helper";
import { List_todo } from "../models/list_todo/list_todo.model";
import { Request,Response } from "express";
import { List } from "../models/lists/list.model";

const addList_todo = async (req:Request,res:Response) => {
    try {
        
        const {list_todo,list_id,my_day,important,task} = req.body;
        const token = (req as any).token;

        const openedToken = unCode(token);

        if(list_id){
            const checkUser = await List.findOne({where:{list_id}});

            if(checkUser?.user_id !== (openedToken as any).user_id){
                return res.status(400).json({
                        status:400,
                        msg:`You can only updated your own list`
                })
            }
        }

        const add_todo = await List_todo.create({task,important,my_day,list_todo,list_id:list_id || null,user_id:(openedToken as any).user_id});

        res.status(200).json({
            status:200, 
            msg:'add todo',
            data:add_todo
        })

    } catch (error) {
        console.log(error);
        
        res.status(500).send('internal server error');

    }
}

const getAllTodo = async (req:Request,res:Response) => {
    try {

        const token = (req as any).token;

        const openedToken = unCode(token);
        
        const allTodo = await List_todo.findAll({where:{user_id:(openedToken as any).user_id}});

        res.status(200).json({
            status:200,
            msg:'add todo',
            data:allTodo
        })

    } catch (error) {
        
        res.status(500).send('internal server error');

    }
}

const deleteTodo = async (req:Request,res:Response) => {
    try {
        const {id} = req.params;
        const token = (req as any).token;

        const openedToken = unCode(token);
        
        const checkUser = await List_todo.findByPk(id);
        

        if(checkUser?.user_id !== (openedToken as any).user_id){
            return res.status(400).json({
                    status:400,
                    msg:`You can only updated your own list`
            })
        }

        await List_todo.destroy({where:{todo_id:id}});

        res.status(200).json({
            status:200,
            msg:'deleted todo'
        })

    } catch (error) {
        
        res.status(500).send('internal server error');

    }
}

const updateTodo = async (req:Request,res:Response) => {
    try {
        const {list_todo,important,completed} = req.body;
        const {id} = req.params;
        const token = (req as any).token;

        const openedToken = unCode(token);
        
        const checkUser = await List_todo.findByPk(id);
        

        if(checkUser?.user_id !== (openedToken as any).user_id){ 
            return res.status(400).json({
                    status:400,
                    msg:`You can only updated your own list`
            })
        }

        await List_todo.update({list_todo,important,completed},{where:{todo_id:id}});

        res.status(200).json({
            status:200,
            msg:'updated todo',
            updated:true
        })

    } catch (error) {
        
        res.status(500).send('internal server error');

    }
}


export {addList_todo,getAllTodo,deleteTodo,updateTodo}