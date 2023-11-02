"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.List_todo = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../../config/sequelize");
class List_todo extends sequelize_1.Model {
}
exports.List_todo = List_todo;
;
List_todo.init({
    todo_id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    list_todo: {
        type: sequelize_1.DataTypes.STRING(50),
    },
    important: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    },
    my_day: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    },
    completed: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    },
    task: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    },
}, {
    sequelize: sequelize_2.newSequlize,
    tableName: "list_todo",
    paranoid: true
});
