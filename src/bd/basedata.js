import {createPool} from 'mysql2/promise';

export const conectioDB = createPool({
    host: "localhost",
    user: "root",
    database: "tasks_db",
    password: ""
})