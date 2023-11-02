"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newSequlize = void 0;
const sequelize_1 = require("sequelize");
const newSequlize = new sequelize_1.Sequelize('postgres://postgre_szwm_user:SfkmpLeoHMBkkTKPYcxPUGY2YHCoXgUu@dpg-cl21rbil7jac73f62in0-a.oregon-postgres.render.com/postgre_szwm', {
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
