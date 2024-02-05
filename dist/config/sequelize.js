"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newSequlize = void 0;
const sequelize_1 = require("sequelize");
const newSequlize = new sequelize_1.Sequelize('postgres://postgres1:QYkMAro0nbQIdU0n36UTJvRixC9X4Bdt@dpg-cn0gaaol5elc73ejil40-a.oregon-postgres.render.com/shop_d311', {
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
