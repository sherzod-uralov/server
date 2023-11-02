"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyCode = exports.register = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const redis = __importStar(require("redis"));
const jwt_helper_js_1 = require("../helpers/jwt.helper.js");
const users_model_1 = require("../models/users/users.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
async function func() {
    const url = 'redis://redis-10081.c265.us-east-1-2.ec2.cloud.redislabs.com:10081';
    const client = await redis.createClient({ url, password: 'W4SbAUPSADlYXhnXBg1QKlz7wV7hYUn4' }).connect();
    return client;
}
func()
    .then((client) => {
    console.log('Connected to Redis');
    // Use the client for Redis operations
})
    .catch((error) => {
    console.error('Error connecting to Redis:', error);
});
function generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000);
}
const register = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const redisClient = await func();
        const verificationCode = generateVerificationCode();
        const transporter = nodemailer_1.default.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'sherzoduralov444@gmail.com',
                pass: 'zrqj ceix dqig hsqk',
            },
        });
        const mailOptions = {
            from: 'micrasoft_todo@gmail.com',
            to: email,
            subject: "Ro'yxatdan o'tish uchun tekshiruv kodi",
            html: `
        <html>
          <head>
            <style>
              button {
                background-color: #007BFF;
                color: #fff;
                padding: 10px 20px;
                margin:0 auto;
                display:block;
                border: none;
                margin-top:25px;
                border-radius: 5px;
                text-decoration: none;
              }
              button:hover{
                background-color:black;
                transition:0.4s;
              }
              .img{
                margin:0 auto;
                display:block;
                width:100%
              }
            </style>
          </head>
          <body>
            <p>Ro'yxatdan o'tish uchun tekshiruv kodingiz</p>
            <img class="img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJSPhf7NaatJ-ppCy2vSNbZdVA-nKcOn9_eQ&usqp=CAU"></img>
            <button>${verificationCode}</button>
          </body>
        </html>
      `,
        };
        transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
                res.status(500).json('Email yuborishda xatolik yuz berdi.');
            }
            else {
                await redisClient.setEx('email', 60, JSON.stringify({ verificationCode, username, password, email }));
                return res.status(200).json({
                    status: 200,
                    msg: 'tekshiruv kodi emailingizga yuborildi!'
                });
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, msg: 'Internal server error' });
    }
};
exports.register = register;
const verifyCode = async (req, res) => {
    try {
        const { code } = req.body;
        const redisClient = await func();
        let email = await redisClient.get('email');
        console.log(email);
        const vcode = JSON.parse(email);
        if (!email) {
            return res.status(400).json({
                status: 400,
                msg: "kod yuborilmagan yoki xatolik yuz berdi"
            });
        }
        if (vcode && Number(vcode.verificationCode) === Number(code)) {
            const findUser = await users_model_1.User.findOne({ where: { email: vcode.email } });
            if (findUser) {
                return res.status(201).json({
                    status: 409,
                    msg: 'alredy verified'
                });
            }
            const hashPaswd = await bcrypt_1.default.hash(vcode.password, 5);
            await users_model_1.User.create({
                username: vcode.username,
                email: vcode.email,
                password: hashPaswd
            });
            const user = await users_model_1.User.findOne({ where: { username: vcode.username } });
            const token = (0, jwt_helper_js_1.deCode)({ email: vcode.email, username: vcode.username, user_id: user?.user_id });
            await redisClient.del('email');
            return res.status(201).json({
                status: 201,
                msg: 'verified',
                token
            });
        }
        else {
            return res.status(400).json({
                status: 400,
                msg: 'wrong password'
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, msg: 'Internal server error' });
    }
};
exports.verifyCode = verifyCode;
