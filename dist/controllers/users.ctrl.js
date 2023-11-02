"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allUsers = exports.getPRofileInformation = exports.userPRofileUpdate = void 0;
const users_model_1 = require("../models/users/users.model");
const jwt_helper_1 = require("../helpers/jwt.helper");
const userPRofileUpdate = async (req, res) => {
    try {
        const { username } = req.body;
        const file = req.file;
        console.log(file);
        const token = req.token;
        const openedToken = (0, jwt_helper_1.unCode)(token);
        const findUser = await users_model_1.User.findByPk(openedToken.user_id);
        await users_model_1.User.update({
            profile_image: `/uploads/${file?.filename}`,
            username
        }, {
            where: {
                user_id: openedToken.user_id
            }
        });
        res.status(200).json({
            status: 200,
            msg: "successfuly"
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send('internal server error');
    }
};
exports.userPRofileUpdate = userPRofileUpdate;
const getPRofileInformation = async (req, res) => {
    try {
        const token = req.token;
        const openedToken = (0, jwt_helper_1.unCode)(token);
        const findUser = await users_model_1.User.findByPk(openedToken.user_id);
        res.status(200).json({
            status: 200,
            msg: "successfuly",
            information: findUser
        });
    }
    catch (error) {
        return res.status(500).send('internal server error');
    }
};
exports.getPRofileInformation = getPRofileInformation;
const allUsers = async (req, res) => {
    try {
        const findUser = await users_model_1.User.findAll();
        res.status(200).json({
            status: 200,
            msg: "successfuly",
            information: findUser
        });
    }
    catch (error) {
        return res.status(500).send('internal server error');
    }
};
exports.allUsers = allUsers;
