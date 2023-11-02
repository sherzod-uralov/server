import express, { Application } from "express";
import 'dotenv/config'
import { newSequlize } from "./config/sequelize";
import { router } from "./routers/index.routes";
import cors from 'cors'
import path from 'path'

const bootstrap = async ():Promise<void> => {
    try { 

        const app:Application = express();
        app.use('/uploads',express.static(path.join(process.cwd(),'uploads')))
        app.use(cors())
        app.use(express.json());  
         
        newSequlize.authenticate();
        await newSequlize.sync({alter:true});
        console.log('database connected succsessfuly');  

        const PORT:Object = process.env.PORT || 3400; 
 
        app.use('/api',router)

        app.listen(Number(PORT),() => console.log(`server running on port: ${PORT}`));
 
    } catch (error) {   
           
        console.log(error);  
        
    }
};

bootstrap(); 