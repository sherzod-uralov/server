"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newSequlize = void 0;
const sequelize_1 = require("sequelize");
const newSequlize = new sequelize_1.Sequelize('postgres://microsoft_user:Uy7cdmeZuKuCM19AHiiUHsFOYEfIGSwo@dpg-cl23460310os73e1eao0-a.oregon-postgres.render.com/microsoft', {
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
