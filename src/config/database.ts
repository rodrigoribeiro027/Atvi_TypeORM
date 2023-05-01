import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
dotenv.config();

const database = new DataSource({
    url: "postgres://exyuyimy:ejatHWyFz8MQmmPkQYrOBgEUlNaME0Ye@babar.db.elephantsql.com/exyuyimy",
    //database: "",
    type: "postgres",
    // host: HOST,
    // port: 3304,
    // username: USER,
    // password:PASSWORD,
    synchronize: false, 
    logging: false,
    entities: ["src/entity/*.ts"],
    migrations: ["src/migrations/*.ts"],
    subscribers: [],
    maxQueryExecutionTime: 2000
});

export default database;