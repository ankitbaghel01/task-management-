// Get references to elements
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoLane = document.getElementById("todo-lane");

// Add a submit event listener to the form
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = input.value;
  const description = prompt("Enter task description:"); // Prompt for task description

  if (!title) return;

  const newTask = document.createElement("details");
  newTask.classList.add("task");
  newTask.setAttribute("draggable", "true");

  const summary = document.createElement("summary");
  summary.innerText = title;

  const descriptionPara = document.createElement("p");
  descriptionPara.innerText = description || "No description"; // Use user input or a default message

  newTask.appendChild(summary);
  newTask.appendChild(descriptionPara);

  // Add drag-and-drop event listeners
  newTask.addEventListener("dragstart", () => {
    newTask.classList.add("is-dragging");
  });

  newTask.addEventListener("dragend", () => {
    newTask.classList.remove("is-dragging");
  });

  // Append the new task to the TODO lane
  todoLane.appendChild(newTask);

  // Clear the input field
  input.value = "";
});
