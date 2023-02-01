import { DataSource } from "typeorm"
import { config } from "dotenv"
import path from "path"

config()
const {DB_PORT, DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE} = process.env

export const dataSource = new DataSource({
    type:"postgres",
    port: Number(DB_PORT),
    host: DB_HOST,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    synchronize:true,
    entities: [path.join(__dirname, "..", "entities", "*.entity.{ts,js}")]
})