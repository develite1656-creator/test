const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskDate = document.getElementById("taskDate");
let tasks = [];
window.onload = function () {
    let savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        showTasks();
    }
};
addBtn.onclick = function () {
    addTask();
};
taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }

});
function addTask() {
    let text = taskInput.value.trim();
    if (text === "") {
        alert("Please enter a task.");
        return;
    }
    let task = {
    id: Date.now(),
    name: text,
    date: taskDate.value,
    completed: false
};
    tasks.push(task);
    taskDate.value = "";
    saveTasks();
    showTasks();
}
function showTasks() {
    taskList.innerHTML = "";
    for (let index = 0; index < tasks.length; index++) {
        let li = document.createElement("li");
        li.className = "task";
        let left = document.createElement("div");
        left.className = "left";
        let checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.checked = tasks[index].completed;
        checkBox.onclick = function () {
            tasks[index].completed = checkBox.checked;
            saveTasks();
            showTasks();
        };
        let taskText = document.createElement("span");

     if (tasks[index].date == "") {
    taskText.innerHTML = tasks[index].name;
   }
   else {
    taskText.innerHTML = tasks[index].name +
        "<br><small>Due: " + tasks[index].date + "</small>";
}
        if (tasks[index].completed) {
            taskText.classList.add("completed");
        }
        left.appendChild(checkBox);
        left.appendChild(taskText);
        let right = document.createElement("div");
        right.className = "right";
       let editBtn = document.createElement("button");
editBtn.innerText = "Edit";
editBtn.className = "editBtn";
editBtn.addEventListener("click", function () {
    let updatedTask = prompt("Edit Task", tasks[index].name);
    if (updatedTask === null) {
        return;
    }
    updatedTask = updatedTask.trim();
    if (updatedTask === "") {
        alert("Task cannot be empty.");
        return;
    }
    tasks[index].name = updatedTask;
    saveTasks();
    showTasks();
});
        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.className = "deleteBtn";
        deleteBtn.onclick = function () {
            let confirmDelete = confirm("Delete this task?");
            if (confirmDelete) {
                tasks.splice(index, 1);
                saveTasks();
                showTasks();
            }
        };
        right.appendChild(editBtn);
        right.appendChild(deleteBtn);
        li.appendChild(left);
        li.appendChild(right);
        taskList.appendChild(li);
    }
}
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}