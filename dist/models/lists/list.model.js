"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../../config/sequelize");
const users_model_1 = require("../users/users.model");
const list_todo_model_1 = require("../list_todo/list_todo.model");
class List extends sequelize_1.Model {
}
exports.List = List;
;
List.init({
    list_id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    list_name: {
        type: sequelize_1.DataTypes.STRING(50),
    },
    IsrenameIng: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    sequelize: sequelize_2.newSequlize,
    tableName: "lists",
    paranoid: true
});
list_todo_model_1.List_todo.belongsTo(users_model_1.User, { foreignKey: "user_id" });
List.hasMany(list_todo_model_1.List_todo, { foreignKey: "list_id" });
users_model_1.User.hasMany(List, { foreignKey: 'user_id' });
