"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.singleList = exports.updateList = exports.deleteList = exports.addList = exports.getAllLists = void 0;
const list_model_1 = require("../models/lists/list.model");
const jwt_helper_1 = require("../helpers/jwt.helper");
const list_todo_model_1 = require("../models/list_todo/list_todo.model");
const getAllLists = async (req, res) => {
    try {
        const list = await list_model_1.List.findAll({
            include: list_todo_model_1.List_todo
        });
        const token = req.token;
        const openedToken = (0, jwt_helper_1.unCode)(token);
        res.status(200).json({
            status: 200,
            msg: 'OK',
            data: list
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send('internal server error');
    }
};
exports.getAllLists = getAllLists;
const addList = async (req, res) => {
    try {
        const { list_name } = req.body;
        const token = req.token;
        if (!list_name) {
            return res.status(400).json({
                status: 400,
                msg: 'malumot kiritilmagan'
            });
        }
        const openedToken = (0, jwt_helper_1.unCode)(token);
        const newList = await list_model_1.List.create({ list_name, user_id: openedToken.user_id });
        res.status(200).json({
            status: 200,
            msg: 'OK',
            data: newList
        });
    }
    catch (error) {
        res.status(500).send('internal server error');
    }
};
exports.addList = addList;
const deleteList = async (req, res) => {
    try {
        const { id } = req.params;
        const token = req.token;
        const openedToken = (0, jwt_helper_1.unCode)(token);
        const checkUser = await list_model_1.List.findOne({ where: { list_id: id } });
        if (checkUser?.user_id !== openedToken.user_id) {
            return res.status(400).json({
                status: 400,
                msg: `You can only delete your own list`
            });
        }
        const deleteList = await list_model_1.List.destroy({ where: { list_id: id } });
        await list_todo_model_1.List_todo.destroy({ where: { list_id: id } });
        return res.status(200).json({
            status: 200,
            delete_id: id,
            msg: `list successfully deleted`,
            deleted: deleteList
        });
    }
    catch (error) {
        res.status(500).send('internal server error');
    }
};
exports.deleteList = deleteList;
const updateList = async (req, res) => {
    try {
        const { list_name, IsrenameIng } = req.body;
        const { id } = req.params;
        const token = req.token;
        const openedToken = (0, jwt_helper_1.unCode)(token);
        const checkUser = await list_model_1.List.findOne({ where: { list_id: id } });
        if (checkUser?.user_id !== openedToken.user_id) {
            return res.status(400).json({
                status: 400,
                msg: `You can only updated your own list`
            });
        }
        const updatedList = await list_model_1.List.update({ list_name, IsrenameIng }, { where: { list_id: id } });
        return res.status(200).json({
            status: 200,
            update_id: id,
            msg: `list successfully updated`,
            updated: updatedList
        });
    }
    catch (error) {
        res.status(500).send('internal server error');
    }
};
exports.updateList = updateList;
const singleList = async (req, res) => {
    try {
        const id = req.params.id;
        const list = await list_model_1.List.findAll({ where: { list_id: id },
            include: [list_todo_model_1.List_todo]
        });
        const token = req.token;
        res.status(200).json({
            status: 200,
            msg: 'OK',
            data: list[0]
        });
    }
    catch (error) {
        res.status(500).send('internal server error');
    }
};
exports.singleList = singleList;
