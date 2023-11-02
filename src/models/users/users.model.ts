import { DataTypes, Model} from "sequelize";
import { newSequlize } from "../../config/sequelize";


class User extends Model {
    declare user_id:number
    declare username:String
    declare password: number
};


User.init({
    user_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        unique:true
    },
    username:{
        type:DataTypes.STRING(100)
    },
    email:{
        type:DataTypes.STRING(50),
        validate:{
            minLength: (value:String) =>{
                if(value && value.length < 3){
                    throw new Error("min length 3");
                }
            } 
        }
    },
    password: {
        type:DataTypes.STRING,
    },
    profile_image:{
        type:DataTypes.STRING(100)
    }
},
{
    sequelize:newSequlize,
    tableName:"users",
    paranoid:true 
})

export {User}