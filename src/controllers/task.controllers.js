import {conectioDB} from '../bd/basedata.js';

//mostrar
export const showTask = async (req, res) => {
    try {
        const [tareas] = await conectioDB.query('SELECT * FROM tasks')
        
        if (!tareas) {
            return res.json({message: 'no hay tareas'})
        }

        res.json(tareas)
    } catch (error) {
        console.log(error);
    return res.status(500).json({
        error: error
    })
    }
}
//buscar por id
export const showTaskID = async (req,res) => {
    const id = req.params.id;
    try {
        const [row] = await conectioDB.query('SELECT * FROM tasks WHERE id = ?', [id])
        const taks = row[0];

        if (!taks) {
            return res.status(404).json({message: "La tarea ingresa no existe en nuestro sistema"})
        }
        res.json(taks)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error
        })
    }
}

//crear
export const createTask = async (req, res) => {
const {title, description, isComplete} = req.body
try {
    if (!title || !description || !isComplete) {
        return res.status(400).json({ message: "Todos los campos deben estar rellenados" });
      }
    if (typeof title != 'string' || typeof description != 'string') {
        return res.status(400).json({ message: "Ingrese informacion de tipo textos" });
    }
    if (typeof isComplete != 'boolean') {
        return res.status(400).json({ message: "Ingrese true o false" });
    }
    if (title.length > 250) {
        return res.status(400).json({ message: "El titulo puede contener 250 como maximo caracteres" });
    }
    const [rows] = await conectioDB.query('SELECT * FROM tasks WHERE title = ?', [title])
    const exist = rows[0]
    if (exist) {
        return res.status(400).json({message: 'El titulo que desea ingresar ya existe'})
    }
    
    const sql = 'INSERT INTO tasks(title, description, isComplete) VALUES (?,?,?)'
    await conectioDB.query(sql, [title, description, isComplete])
    res.json({
        message : 'Tarea creada correctamente'
    })
    
} catch (error) {
    
    console.log(error);
    return res.status(500).json({
        error: error
    })
}
}

export const editTaskID = async (req,res) => {
    const id = req.params.id;
    const {title, description, isComplete} = req.body
    try {
        if (!title || !description || !isComplete) {
            return res.status(400).json({ message: "Todos los campos deben estar rellenados" });
        }
        if (typeof title != 'string' || typeof description != 'string') {
            return res.status(400).json({ message: "Ingrese informacion de tipo textos" });
        }
        if (typeof isComplete != 'boolean') {
            return res.status(400).json({ message: "Ingrese true o false" });
        }
        if (title.length > 250) {
            return res.status(400).json({ message: "El titulo puede contener 250 como maximo caracteres" });
        }
        const [row] = await conectioDB.query('SELECT * FROM tasks WHERE id = ?', [id])
        const taks = row[0];

        if (!taks) {
            return res.status(404).json({message: "La tarea ingresa no existe en nuestro sistema"})
        }
        const sql = 'UPDATE tasks SET title = ?, description = ?, isComplete = ? WHERE id = ?'

        await conectioDB.query(sql, [title, description, isComplete, id])
        return res.status(200).json({message: 'Datos actualizados correctamente'})
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error
        })
    } }

    export const deleteTaskID = async (req,res) => {
        const id = req.params.id;
        try {
            const [row] = await conectioDB.query('SELECT * FROM tasks WHERE id = ?', [id])
            const taks = row[0];
    
            if (!taks) {
                return res.status(404).json({message: "La tarea ingresa no existe en nuestro sistema"})
            }
            const sql = 'DELETE FROM tasks WHERE id = ?'
            await conectioDB.query(sql, [id])
            return res.status(200).json({message: 'Datos eliminados correctamente',
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                error: error
            })
        } }