import { Sequelize } from "sequelize";

const newSequlize = new Sequelize('postgres://postgres1:QYkMAro0nbQIdU0n36UTJvRixC9X4Bdt@dpg-cn0gaaol5elc73ejil40-a.oregon-postgres.render.com/shop_d311',{
    dialect: 'postgres',
    protocol: 'postgres',
    logging:false,  
    dialectOptions: {
      ssl: {
        require: true, 
        rejectUnauthorized: false 
      }
    } 
});
 
export {newSequlize}