const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

let tasks = [];

// Load saved tasks
window.onload = function () {
    const savedTasks = localStorage.getItem("todoTasks");

    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        displayTasks();
    }
};

// Add task
function addTask() {

    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task.");
        return;
    }

    const task = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(task);

    saveTasks();

    displayTasks();

    taskInput.value = "";

    taskInput.focus();
}

// Show all tasks
function displayTasks() {

    taskList.innerHTML = "";

    tasks.forEach(function (task) {

        const li = document.createElement("li");
        li.className = "task";

        li.innerHTML = `
            <div class="task-left">

                <input type="checkbox"
                       ${task.completed ? "checked" : ""}
                       onchange="toggleTask(${task.id})">

                <span class="${task.completed ? "completed" : ""}">
                    ${task.text}
                </span>

            </div>

            <div class="actions">

                <button class="edit-btn"
                        onclick="editTask(${task.id})">
                    <i class="fa-solid fa-pen"></i>
                </button>

                <button class="delete-btn"
                        onclick="deleteTask(${task.id})">
                    <i class="fa-solid fa-trash"></i>
                </button>

            </div>
        `;

        taskList.appendChild(li);

    });

}

// Complete task
function toggleTask(id) {

    tasks = tasks.map(function (task) {

        if (task.id === id) {
            task.completed = !task.completed;
        }

        return task;

    });

    saveTasks();

    displayTasks();
}

// Delete task
function deleteTask(id) {

    const answer = confirm("Delete this task?");

    if (!answer) {
        return;
    }

    tasks = tasks.filter(function (task) {
        return task.id !== id;
    });

    saveTasks();

    displayTasks();
}

// Edit task
function editTask(id) {

    const task = tasks.find(function (item) {
        return item.id === id;
    });

    const updatedText = prompt("Edit your task", task.text);

    if (updatedText === null) {
        return;
    }

    if (updatedText.trim() === "") {
        alert("Task cannot be empty.");
        return;
    }

    task.text = updatedText.trim();

    saveTasks();

    displayTasks();
}

// Save to local storage
function saveTasks() {

    localStorage.setItem("todoTasks", JSON.stringify(tasks));

}

// Button click
addTaskBtn.addEventListener("click", addTask);

// Press Enter
taskInput.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {
        addTask();
    }

});