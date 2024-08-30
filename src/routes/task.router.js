import {createTask, showTask, showTaskID, editTaskID, deleteTaskID} from '../controllers/task.controllers.js';
import {Router} from 'express';

export const task = Router();

//mostrar
task.get('/tasks', showTask)
//buscar por id
task.get('/tasks:id', showTaskID)
//ruta para crear
task.post('/tasks', createTask)
//ruta editar
task.put('/tasks:id', editTaskID)
//ruta para eliminar
task.delete('/tasks:id', deleteTaskID)