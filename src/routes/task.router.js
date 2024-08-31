import {
  createTask,
  showTask,
  showTaskID,
  editTaskID,
  deleteTaskID,
} from "../controllers/task.controllers.js";
import { Router } from "express";

export const task = Router();

//mostrar
task.get("/task", showTask);
//buscar por id
task.get("/task:id", showTaskID);
//ruta para crear
task.post("/task", createTask);
//ruta editar
task.put("/task:id", editTaskID);
//ruta para eliminar
task.delete("/task:id", deleteTaskID);
