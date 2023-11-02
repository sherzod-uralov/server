"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newSequlize = void 0;
const sequelize_1 = require("sequelize");
const newSequlize = new sequelize_1.Sequelize({
    password: 'sherzod',
    database: 'microsoft_todo',
    dialect: 'postgres',
    logging: false,
    username: 'postgres',
    host: 'localhost'
});
exports.newSequlize = newSequlize;
