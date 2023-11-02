"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const users_model_1 = require("../models/users/users.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_helper_1 = require("../helpers/jwt.helper");
const login = async (req, res) => {
    try {
        const { email, password, username } = req.body;
        const checkUser = await users_model_1.User.findOne({ where: { email } });
        if (!checkUser) {
            return res.status(400).json({
                status: 400,
                msg: 'username notfound',
                data: null
            });
        }
        const checkPasswd = await bcrypt_1.default.compare(password.toString(), (checkUser.password).toString());
        if (!checkPasswd) {
            return res.status(400).json({
                status: 400,
                msg: 'wrong password',
                data: null
            });
        }
        else {
            const obj = {
                email,
                username: checkPasswd.username,
                user_id: checkUser.user_id
            };
            const newToken = (0, jwt_helper_1.deCode)(obj);
            return res.status(200).json({
                status: 200,
                msg: 'logged',
                token: newToken
            });
        }
    }
    catch (error) {
        res.status(500).json({ status: 500, msg: 'Internal server error' });
    }
};
exports.login = login;
