"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unCode = exports.deCode = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const deCode = (payload) => {
    return jsonwebtoken_1.default.sign(payload, process.env.SEC_KEY);
};
exports.deCode = deCode;
const unCode = (token) => {
    return jsonwebtoken_1.default.verify(token, process.env.SEC_KEY);
};
exports.unCode = unCode;
