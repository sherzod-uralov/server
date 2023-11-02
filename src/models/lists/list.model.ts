import { DataTypes, Model} from "sequelize";
import { newSequlize } from "../../config/sequelize";
import { User } from "../users/users.model";
import { List_todo } from "../list_todo/list_todo.model";

class List extends Model {
    declare user_id:number
    declare username:String
    declare password: number
};

List.init({
    list_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        unique:true
    },
    list_name:{
        type:DataTypes.STRING(50), 
    },
    IsrenameIng:{
        type:DataTypes.BOOLEAN, 
        defaultValue:false 
    }
},
{
    sequelize:newSequlize,
    tableName:"lists",
    paranoid:true
});

List_todo.belongsTo(User,{foreignKey:"user_id"});

List.hasMany(List_todo,{foreignKey:"list_id"});
User.hasMany(List,{foreignKey:'user_id'});

export {List}
 