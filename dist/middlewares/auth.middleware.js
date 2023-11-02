"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleWare = void 0;
const jwt_helper_1 = require("../helpers/jwt.helper");
const authMiddleWare = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(403).json({
                status: 403,
                msg: "token is not available"
            });
        }
        const checkToken = (0, jwt_helper_1.unCode)(token);
        if (!checkToken) {
            return res.status(403).json({
                status: 403,
                msg: "the token is invalid or expired"
            });
        }
        req.token = token;
        return next();
    }
    catch (error) {
        console.log(error);
    }
};
exports.authMiddleWare = authMiddleWare;
