"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const sequelize_1 = require("./config/sequelize");
const index_routes_1 = require("./routers/index.routes");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const bootstrap = async () => {
    try {
        const app = (0, express_1.default)();
        app.use('/uploads', express_1.default.static(path_1.default.join(process.cwd(), 'uploads')));
        app.use((0, cors_1.default)());
        app.use(express_1.default.json());
        sequelize_1.newSequlize.authenticate();
        await sequelize_1.newSequlize.sync({ alter: true });
        console.log('database connected succsessfuly');
        const PORT = process.env.PORT || 3400;
        app.use('/api', index_routes_1.router);
        app.listen(Number(PORT), () => console.log(`server running on port: ${PORT}`));
    }
    catch (error) {
        console.log(error);
    }
};
bootstrap();
