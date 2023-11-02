"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTodo = exports.deleteTodo = exports.getAllTodo = exports.addList_todo = void 0;
const jwt_helper_1 = require("../helpers/jwt.helper");
const list_todo_model_1 = require("../models/list_todo/list_todo.model");
const list_model_1 = require("../models/lists/list.model");
const addList_todo = async (req, res) => {
    try {
        const { list_todo, list_id, my_day, important, task } = req.body;
        const token = req.token;
        const openedToken = (0, jwt_helper_1.unCode)(token);
        if (list_id) {
            const checkUser = await list_model_1.List.findOne({ where: { list_id } });
            if (checkUser?.user_id !== openedToken.user_id) {
                return res.status(400).json({
                    status: 400,
                    msg: `You can only updated your own list`
                });
            }
        }
        const add_todo = await list_todo_model_1.List_todo.create({ task, important, my_day, list_todo, list_id: list_id || null, user_id: openedToken.user_id });
        res.status(200).json({
            status: 200,
            msg: 'add todo',
            data: add_todo
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send('internal server error');
    }
};
exports.addList_todo = addList_todo;
const getAllTodo = async (req, res) => {
    try {
        const token = req.token;
        const openedToken = (0, jwt_helper_1.unCode)(token);
        const allTodo = await list_todo_model_1.List_todo.findAll({ where: { user_id: openedToken.user_id } });
        res.status(200).json({
            status: 200,
            msg: 'add todo',
            data: allTodo
        });
    }
    catch (error) {
        res.status(500).send('internal server error');
    }
};
exports.getAllTodo = getAllTodo;
const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const token = req.token;
        const openedToken = (0, jwt_helper_1.unCode)(token);
        const checkUser = await list_todo_model_1.List_todo.findByPk(id);
        if (checkUser?.user_id !== openedToken.user_id) {
            return res.status(400).json({
                status: 400,
                msg: `You can only updated your own list`
            });
        }
        await list_todo_model_1.List_todo.destroy({ where: { todo_id: id } });
        res.status(200).json({
            status: 200,
            msg: 'deleted todo'
        });
    }
    catch (error) {
        res.status(500).send('internal server error');
    }
};
exports.deleteTodo = deleteTodo;
const updateTodo = async (req, res) => {
    try {
        const { list_todo, important, completed } = req.body;
        const { id } = req.params;
        const token = req.token;
        const openedToken = (0, jwt_helper_1.unCode)(token);
        const checkUser = await list_todo_model_1.List_todo.findByPk(id);
        if (checkUser?.user_id !== openedToken.user_id) {
            return res.status(400).json({
                status: 400,
                msg: `You can only updated your own list`
            });
        }
        await list_todo_model_1.List_todo.update({ list_todo, important, completed }, { where: { todo_id: id } });
        res.status(200).json({
            status: 200,
            msg: 'updated todo',
            updated: true
        });
    }
    catch (error) {
        res.status(500).send('internal server error');
    }
};
exports.updateTodo = updateTodo;
