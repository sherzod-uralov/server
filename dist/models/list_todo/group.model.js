"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Group = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../../config/sequelize");
class Group extends sequelize_1.Model {
}
exports.Group = Group;
;
Group.init({
    group_id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    group_name: {
        type: sequelize_1.DataTypes.STRING(50),
    }
}, {
    sequelize: sequelize_2.newSequlize,
    tableName: "groups",
    paranoid: true
});
