"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../../config/sequelize");
class User extends sequelize_1.Model {
}
exports.User = User;
;
User.init({
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    username: {
        type: sequelize_1.DataTypes.STRING(100)
    },
    email: {
        type: sequelize_1.DataTypes.STRING(50),
        validate: {
            minLength: (value) => {
                if (value && value.length < 3) {
                    throw new Error("min length 3");
                }
            }
        }
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
    },
    profile_image: {
        type: sequelize_1.DataTypes.STRING(100)
    }
}, {
    sequelize: sequelize_2.newSequlize,
    tableName: "users",
    paranoid: true
});
