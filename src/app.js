import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

//base de datos
import {conectioDB} from './bd/basedata.js';

conectioDB

//rutas 
import {task} from './routes/task.router.js';

app.use(task)

//servidor
const port = process.env.PORT || 4000

app.listen(port, console.log('servidor funcionando en el puerto ', port))