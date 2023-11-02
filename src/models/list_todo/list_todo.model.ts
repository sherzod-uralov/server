import { DataTypes, Model} from "sequelize";
import { newSequlize } from "../../config/sequelize";
import { List } from "../lists/list.model";


class List_todo extends Model {
    declare user_id:number
    declare username:String
    declare password: number
};


List_todo.init({
    todo_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        unique:true
    },
    list_todo:{
        type:DataTypes.STRING(50),
    },
    important:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    my_day:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    completed:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    task:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
},
{
    sequelize:newSequlize,
    tableName:"list_todo",
    paranoid:true
})


export {List_todo}