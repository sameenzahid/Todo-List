document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task");
    const taskList = document.getElementById("taskList");
    const addButton = document.getElementById("addButton");

    addButton.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
            <span>${taskText}</span>
            <button class="edit-button">Edit</button>
            <button class="delete-button">Delete</button>
        `;

        taskList.appendChild(taskItem);
        taskInput.value = "";

        addButton.addEventListener("click", () => {
            const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            tasks.push(taskText);
            localStorage.setItem("tasks", JSON.stringify(tasks));
        });

        const editButtons = document.querySelectorAll(".edit-button");
        const deleteButtons = document.querySelectorAll(".delete-button");

        editButtons.forEach((editButton, index) => {
            editButton.addEventListener("click", () => {
                const tasks = JSON.parse(localStorage.getItem("tasks"));
                const updatedTaskText = prompt("Edit task:", tasks[index]);
                if (updatedTaskText !== null) {
                    tasks[index] = updatedTaskText;
                    localStorage.setItem("tasks", JSON.stringify(tasks));
                    taskItem.querySelector("span").textContent = updatedTaskText;
                }
            });
        });

        deleteButtons.forEach((deleteButton, index) => {
            deleteButton.addEventListener("click", () => {
                const tasks = JSON.parse(localStorage.getItem("tasks"));
                tasks.splice(index, 1);
                localStorage.setItem("tasks", JSON.stringify(tasks));
                taskList.removeChild(taskItem);
            });
        });
    });
});
