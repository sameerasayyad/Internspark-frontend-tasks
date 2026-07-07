// =========================
// Student Task Manager
// =========================

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskInput = document.getElementById("taskInput");
const addTask = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const searchTask = document.getElementById("searchTask");
const filterTask = document.getElementById("filterTask");

// Save to Local Storage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Display Tasks
function displayTasks() {

    taskList.innerHTML = "";

    let keyword = searchTask.value.toLowerCase();
    let filter = filterTask.value;

    tasks.forEach((task, index) => {

        if (!task.text.toLowerCase().includes(keyword)) return;

        if (filter === "completed" && !task.completed) return;
        if (filter === "pending" && task.completed) return;

        const li = document.createElement("li");

        li.className = "list-group-item";

        li.innerHTML = `
            <span class="task-text ${task.completed ? "completed" : ""}">
                ${task.text}
            </span>

            <div class="task-buttons">

                <button class="complete-btn" onclick="toggleTask(${index})">
                    ${task.completed ? "Undo" : "Complete"}
                </button>

                <button class="edit-btn" onclick="editTask(${index})">
                    Edit
                </button>

                <button class="delete-btn" onclick="deleteTask(${index})">
                    Delete
                </button>

            </div>
        `;

        taskList.appendChild(li);

    });

}

// Add Task
addTask.addEventListener("click", () => {

    let value = taskInput.value.trim();

    if (value === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        text: value,
        completed: false
    });

    taskInput.value = "";

    saveTasks();

    displayTasks();

});

// Delete
function deleteTask(index) {

    if (confirm("Delete this task?")) {

        tasks.splice(index, 1);

        saveTasks();

        displayTasks();

    }

}

// Complete
function toggleTask(index) {

    tasks[index].completed = !tasks[index].completed;

    saveTasks();

    displayTasks();

}

// Edit
function editTask(index) {

    let updated = prompt("Edit Task", tasks[index].text);

    if (updated !== null && updated.trim() !== "") {

        tasks[index].text = updated.trim();

        saveTasks();

        displayTasks();

    }

}

// Search
searchTask.addEventListener("keyup", displayTasks);

// Filter
filterTask.addEventListener("change", displayTasks);

// Enter Key
taskInput.addEventListener("keypress", function(e){

    if(e.key === "Enter"){

        addTask.click();

    }

});

// Initial Load
displayTasks();