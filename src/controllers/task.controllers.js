import { conectioDB } from "../bd/basedata.js";

//mostrar
export const showTask = async (req, res) => {
  try {
    const [tareas] = await conectioDB.query("SELECT * FROM tasks");

    if (!tareas) {
      return res.json({ message: "no hay tareas" });
    }

    res.json(tareas);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error,
    });
  }
};

//buscar por id
export const showTaskID = async (req, res) => {
  const id = req.params.id;
  try {
    const [row] = await conectioDB.query("SELECT * FROM tasks WHERE id = ?", [
      id,
    ]);
    const taks = row[0];

    if (!taks) {
      return res
        .status(404)
        .json({ message: "La tarea ingresa no existe en nuestro sistema" });
    }
    res.json(taks);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error,
    });
  }
};

//crear
export const createTask = async (req, res) => {
  const { title, description, isComplete } = req.body;
  try {
    await conectioDB.query(
      "INSERT INTO tasks(title, description, isComplete) VALUES (?,?,?)",
      [title, description, isComplete]
    );
    res.json({
      message: "Tarea creada correctamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const editTaskID = async (req, res) => {
  const id = req.params.id;
  const { title, description, isComplete } = req.body;
  try {
    await conectioDB.query(
      "UPDATE tasks SET title = ?, description = ?, isComplete = ? WHERE id = ?",
      [title, description, isComplete, id]
    );
    return res
      .status(200)
      .json({ message: "Datos actualizados correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error,
    });
  }
};

export const deleteTaskID = async (req, res) => {
  const id = req.params.id;
  try {
    await conectioDB.query("DELETE FROM tasks WHERE id = ?", [id]);
    return res.status(200).json({ message: "Datos eliminados correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};
