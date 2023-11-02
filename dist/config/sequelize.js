"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newSequlize = void 0;
const sequelize_1 = require("sequelize");
const newSequlize = new sequelize_1.Sequelize('postgres://sherzod:ywyhg8HDfI9rSwB1XZhI8GJJg6NL9h8O@dpg-cjmq5l7jbvhs73dp8bjg-a.oregon-postgres.render.com/data_nzoq', {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});
exports.newSequlize = newSequlize;
