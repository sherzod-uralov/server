import { Sequelize } from "sequelize";

const newSequlize = new Sequelize({
  password:'sherzod',
  database:'microsoft_todo',
  dialect:'postgres',
  logging:false,
  username:'postgres',
  host:'localhost'
});
 
export {newSequlize}