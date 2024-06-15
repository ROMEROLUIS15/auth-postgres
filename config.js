import { config } from "dotenv";
config()

// config.js
export const DATABASE_CONFIG = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres"
};

export const PORT = process.env.PORT || 8080;

export const TOKEN_SECRET = process.env.TOKEN_SECRET