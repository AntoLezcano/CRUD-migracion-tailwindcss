import { deleteTask, putTask } from "./ServerTask.js";

export const renderTask = (task) => {
  // Contenedor de la tarea
  const $taskContainer = document.createElement("div");
  $taskContainer.classList.add(
    "bg-gray-800",
    "text-black",
    "shadow-md",
    "rounded-lg",
    "p-6",
    "flex",
    "items-start",
    "gap-4",
    "relative"
  );

  // Contenedor del contenido de la tarea
  const $taskContent = document.createElement("div");
  $taskContent.classList.add("flex", "flex-col", "gap-2", "w-full");

  // Título de la tarea
  const taskTitle = document.createElement("p");
  taskTitle.classList.add("font-bold", "text-lg", "task-title");
  taskTitle.textContent = task.title;
  if (task.isComplete) {
    taskTitle.style.textDecoration = "line-through";
  }
  $taskContent.appendChild(taskTitle);

  const $separator = document.createElement("hr");
  $separator.classList.add("border-t", "border-blue-400", "my-1", "border-2");
  $taskContent.appendChild($separator);

  // Descripción de la tarea
  const $taskDescription = document.createElement("p");
  $taskDescription.classList.add("text-gray-300", "task-description");
  $taskDescription.textContent = task.description;
  if (task.isComplete) {
    $taskDescription.style.textDecoration = "line-through";
  }
  $taskContent.appendChild($taskDescription);

  // Contenedor para el checkbox y el botón
  const $taskActions = document.createElement("div");
  $taskActions.classList.add("flex", "items-center", "gap-2", "ml-auto");

  // Checkbox para completar la tarea
  const $taskIsCompleted = document.createElement("input");
  $taskIsCompleted.type = "checkbox";
  $taskIsCompleted.checked = task.isComplete;
  $taskIsCompleted.classList.add(
    "form-checkbox",
    "text-blue-500",
    "h-5",
    "w-5",
    "mr-2"
  );

  $taskIsCompleted.addEventListener("change", (event) => {
    task.isComplete = event.target.checked;
    taskTitle.style.textDecoration = task.isComplete ? "line-through" : "none";
    $taskDescription.style.textDecoration = task.isComplete
      ? "line-through"
      : "none";

    putTask(task.id, {
      title: task.title,
      description: task.description,
      isComplete: task.isComplete,
    });
  });

  const $taskDelete = document.createElement("button");
  $taskDelete.textContent = "Eliminar";
  $taskDelete.classList.add(
    "bg-red-500",
    "text-black",
    "border",
    "border-black",
    "p-2",
    "rounded",
    "hover:bg-red-600",
    "flex",
    "items-center",
    "justify-center",
    "w-24"
  );
  $taskDelete.style.borderWidth = "2px";

  $taskDelete.addEventListener("click", () => {
    deleteTask(task.id).then(() => {
      $taskContainer.remove();
    });
  });

  $taskActions.appendChild($taskIsCompleted);
  $taskActions.appendChild($taskDelete);

  $taskContainer.appendChild($taskContent);
  $taskContainer.appendChild($taskActions);

  return $taskContainer;
};
