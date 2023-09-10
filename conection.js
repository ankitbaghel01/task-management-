const firebaseConfig = {
    apiKey: "AIzaSyAu5D2I_I7PGSImu0LvCJGZu0a4N4VJpJ4",
    authDomain: "task-5bf27.firebaseapp.com",
    databaseURL: "https://task-5bf27-default-rtdb.firebaseio.com",
    projectId: "task-5bf27",
    storageBucket: "task-5bf27.appspot.com",
    messagingSenderId: "77958352727",
    appId: "1:77958352727:web:7ea0b4a579883462c4b812",
    measurementId: "G-PPRLH8PHBJ"
  };
  firebase.initializeApp(firebaseConfig);
  
//   const form = document.getElementById("todo-form");

//   form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     const todoinput = document.getElementById("todoinput").value;
//     const descriptioninput = document.getElementById("descriptioninput").value;

//     // Push data to Firebase
//     firebase.database().ref("formData").push({
//         todoinput: todoinput,
//       descriptioninput: descriptioninput,
//     });

//     // Clear form fields
//     document.getElementById("todoinput").value = "";
//     document.getElementById("descriptioninput").value = "";
//   });


//   const formDataRef = firebase.database().ref("formData");
// formDataRef.on("value", (snapshot) => {
//   // The "snapshot" contains the data from the "formData" node
//   const data = snapshot.val();
//   // Now, you can work with the data
//   displayData(data);
// });

// function displayData(data) {
//     const dataList = document.getElementById("todo-lane");
//     dataList.innerHTML = ""; // Clear the existing content
  
//     for (const key in data) {
//       if (data.hasOwnProperty(key)) {
//         const entry = data[key];
//         const listItem = document.createElement("details");
//         // listItem.textContent = `   task: ${entry.todoinput},
//         // discription: ${entry.descriptioninput}`;
//         // listItem.innerHTML = `Task: ${entry.todoinput}<br>Description:  ${entry.descriptioninput}`;
//     //    / listItem.innerHTML = `<span class="task-text">Task:</span> ${entry.todoinput}<br>Description: ${entry.descriptioninput}`;
//         listItem.innerHTML = `<span class="task-text">Task:</span> ${entry.todoinput}<br>Description: ${entry.descriptioninput}`;


//         dataList.appendChild(listItem);
      
//       }
//     }
//   }
  

//   const tasks = document.querySelectorAll('.task');

//   tasks.forEach(task => {
//       task.addEventListener('dragstart', handleDragStart);
//       task.addEventListener('dragover', handleDragOver);
//       task.addEventListener('drop', handleDrop);
//   });
  
//   function handleDragStart(event) {
//       event.dataTransfer.setData('text/plain', event.target.id);
//   }
  
//   function handleDragOver(event) {
//       event.preventDefault();
//   }
  
//   function handleDrop(event) {
//       event.preventDefault();
//       const taskId = event.dataTransfer.getData('text/plain');
//       const targetTask = event.target.closest('.task');
//       const taskList = event.target.closest('#todo-lane');
  
//       if (targetTask && taskList) {
//           taskList.insertBefore(document.getElementById(taskId), targetTask);
//       }
//   }



// Initialize Firebase (as shown previously)

// Function to create a new task element
function createTaskElement(title, description) {
    const newTask = document.createElement("details");
    newTask.classList.add("task");
    newTask.setAttribute("draggable", "true");
  
    const summary = document.createElement("summary");
    summary.innerText = title;
  
    const descriptionPara = document.createElement("p");
    descriptionPara.classList.add("description");
    descriptionPara.innerText = description || "No description";
  
    const editButton = document.createElement("button");
    editButton.classList.add("edit-button");
    editButton.innerText = "Edit";
  
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.innerText = "Delete";
  
    // Add event listeners for drag-and-drop
    newTask.addEventListener("dragstart", () => {
      newTask.classList.add("is-dragging");
    });
  
    newTask.addEventListener("dragend", () => {
      newTask.classList.remove("is-dragging");
    });
  
    // Add event listeners for delete and edit buttons
    deleteButton.addEventListener("click", () => {
      newTask.remove();
    });
  
    editButton.addEventListener("click", () => {
      const newTitle = prompt("Edit task title:", title);
      if (newTitle !== null) {
        title = newTitle;
        summary.innerText = title;
      }
  
      const newDescription = prompt("Edit task description:", descriptionPara.innerText);
      if (newDescription !== null) {
        descriptionPara.innerText = newDescription;
      }
    });
  
    newTask.appendChild(summary);
    newTask.appendChild(descriptionPara);
    newTask.appendChild(editButton);
    newTask.appendChild(deleteButton);
  
    return newTask;
  }
  
  // Fetch data from Firebase and display it
  const database = firebase.database();
  const dataRef = database.ref("tasks"); // Replace "tasks" with your database path
  const todoLane = document.getElementById("todo-lane");
  
  dataRef.on("value", (snapshot) => {
    todoLane.innerHTML = ""; // Clear the existing content
  
    const data = snapshot.val();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const entry = data[key];
        const newTask = createTaskElement(entry.title, entry.description);
        todoLane.appendChild(newTask);
      }
    }
  });
  
  // Get references to elements
  const form = document.getElementById("todo-form");
  const input = document.getElementById("todoinput");
  const descriptionInput = document.getElementById("descriptioninput");
  
  // Add a submit event listener to the form
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = input.value;
    const description = descriptionInput.value;
  
    if (!title) return;
  
    // Save the new task data to Firebase
    dataRef.push({
      title: title,
      description: description,
    });
  
    // Clear the input fields
    input.value = "";
    descriptionInput.value = "";
  });
  
  