import { Router } from "express";
import { register, verifyCode } from "../controllers/register.ctrl";
import { login } from "../controllers/login.ctrl";
import { addList, deleteList, getAllLists, singleList, updateList } from "../controllers/lists.ctrl";
import { authMiddleWare } from "../middlewares/auth.middleware";
import { addList_todo, deleteTodo, getAllTodo, updateTodo } from "../controllers/list.message.ctrl";
import { allUsers, getPRofileInformation, userPRofileUpdate } from "../controllers/users.ctrl";
import { upload } from "../config/multer.config";

export const router = Router();

//register

router.post('/register',register); 

router.post('/verify',verifyCode); 

//login

router.post('/login',login);

//list
 
router.get('/list',authMiddleWare,getAllLists);

router.post('/list',authMiddleWare,addList);

router.delete('/list/:id',authMiddleWare,deleteList);

router.put('/list/:id',authMiddleWare,updateList);

router.get('/list/:id',authMiddleWare,singleList);
//todo

router.get('/todo',authMiddleWare,getAllTodo); 

router.post('/todo',authMiddleWare,addList_todo);

router.delete('/todo/:id',authMiddleWare,deleteTodo); 

router.put('/todo/:id',authMiddleWare,updateTodo);

//user profile

router.put('/profile',authMiddleWare,upload.single('profile_image'),userPRofileUpdate);

router.get('/profile',authMiddleWare,getPRofileInformation);

router.get('/users',allUsers);