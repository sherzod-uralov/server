"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const register_ctrl_1 = require("../controllers/register.ctrl");
const login_ctrl_1 = require("../controllers/login.ctrl");
const lists_ctrl_1 = require("../controllers/lists.ctrl");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const list_message_ctrl_1 = require("../controllers/list.message.ctrl");
const users_ctrl_1 = require("../controllers/users.ctrl");
const multer_config_1 = require("../config/multer.config");
exports.router = (0, express_1.Router)();
//register
exports.router.post('/register', register_ctrl_1.register);
exports.router.post('/verify', register_ctrl_1.verifyCode);
//login
exports.router.post('/login', login_ctrl_1.login);
//list
exports.router.get('/list', auth_middleware_1.authMiddleWare, lists_ctrl_1.getAllLists);
exports.router.post('/list', auth_middleware_1.authMiddleWare, lists_ctrl_1.addList);
exports.router.delete('/list/:id', auth_middleware_1.authMiddleWare, lists_ctrl_1.deleteList);
exports.router.put('/list/:id', auth_middleware_1.authMiddleWare, lists_ctrl_1.updateList);
exports.router.get('/list/:id', auth_middleware_1.authMiddleWare, lists_ctrl_1.singleList);
//todo
exports.router.get('/todo', auth_middleware_1.authMiddleWare, list_message_ctrl_1.getAllTodo);
exports.router.post('/todo', auth_middleware_1.authMiddleWare, list_message_ctrl_1.addList_todo);
exports.router.delete('/todo/:id', auth_middleware_1.authMiddleWare, list_message_ctrl_1.deleteTodo);
exports.router.put('/todo/:id', auth_middleware_1.authMiddleWare, list_message_ctrl_1.updateTodo);
//user profile
exports.router.put('/profile', auth_middleware_1.authMiddleWare, multer_config_1.upload.single('profile_image'), users_ctrl_1.userPRofileUpdate);
exports.router.get('/profile', auth_middleware_1.authMiddleWare, users_ctrl_1.getPRofileInformation);
exports.router.get('/users', users_ctrl_1.allUsers);
