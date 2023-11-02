import { Sequelize } from "sequelize";

const newSequlize = new Sequelize('postgres://postgre_szwm_user:SfkmpLeoHMBkkTKPYcxPUGY2YHCoXgUu@dpg-cl21rbil7jac73f62in0-a.oregon-postgres.render.com/postgre_szwm',{
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