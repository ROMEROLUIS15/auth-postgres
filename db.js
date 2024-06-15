
import { Sequelize } from "sequelize";
import { DATABASE_CONFIG } from "./config.js";

const sequelize = new Sequelize(
    DATABASE_CONFIG.database,
    DATABASE_CONFIG.username,
    DATABASE_CONFIG.password,
    {
        host: DATABASE_CONFIG.host,
        dialect: DATABASE_CONFIG.dialect,
    }
);

export const connectDB = async () => {
    try {
        await sequelize.sync();
        console.log(`DB CONNECTED ON PORT ${DATABASE_CONFIG.host}`);
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

export default sequelize;


