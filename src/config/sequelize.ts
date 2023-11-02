import { Sequelize } from "sequelize";

const newSequlize = new Sequelize('postgres://microsoft_user:Uy7cdmeZuKuCM19AHiiUHsFOYEfIGSwo@dpg-cl23460310os73e1eao0-a.oregon-postgres.render.com/microsoft',{
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