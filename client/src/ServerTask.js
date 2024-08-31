import { API_URL } from "./Const.js";

// create a new task
export const postTasks = async ({ title, description, isComplete }) => {
  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({ title, description, isComplete }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

// get all tasks
export const getAllTasks = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

// delete a single task
export const deleteTask = async (id) => {
  await fetch(API_URL + `/${id}`, {
    method: "DELETE",
  });
};

// update a single task
export const putTask = async (id, { title, description, isComplete }) => {
  const response = await fetch(API_URL + `/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      description,
      isComplete,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};
