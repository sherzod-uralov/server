import { Sequelize } from "sequelize";

const newSequlize = new Sequelize('postgres://sherzod:ywyhg8HDfI9rSwB1XZhI8GJJg6NL9h8O@dpg-cjmq5l7jbvhs73dp8bjg-a.oregon-postgres.render.com/data_nzoq',{
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