const inputBox = document.getElementById("input_box");
const listContainer = document.getElementById("list_container");
const taskCounter = document.getElementById("taskCounter");

function updateTaskCounter() {
    const taskCount = listContainer.getElementsByTagName("li").length;
    taskCounter.textContent = `${taskCount} ${taskCount === 1 ? 'task' : 'tasks'}`;
}

function addTask() {
    const deadline = document.getElementById("dead_line").value;
    if (inputBox.value === '' || deadline === '') {
        alert(inputBox.value === '' ? "Напиши что-нибудь гандон!" : "создай дедлайн хуила в строке \"дд.мм.гггг\"!");
    } else {
        const task = { text: inputBox.value, deadline };
        const li = document.createElement("li");
        li.innerHTML = `${task.text} Date: ${task.deadline}`;
        listContainer.appendChild(li).appendChild(document.createElement("span")).innerHTML = "\u00d7";
        updateTaskCounter(); 
        saveData();
    }
    inputBox.value = "";
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI" || e.target.tagName === "SPAN") {
        const li = e.target.closest("li");
        if (e.target.tagName === "LI") li.classList.toggle("checked");
        else li.remove();
        updateTaskCounter(); 
        saveData();
    }
}, false);

function saveData() {
    const tasks = [...listContainer.querySelectorAll("li")].map(li => ({
        text: li.textContent.split(" Date: ")[0],
        deadline: li.textContent.split(" Date: ")[1].slice(0, -1),
        completed: li.classList.contains("checked") // Save completion status
    }));
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showList() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `${task.text} Date: ${task.deadline}`;
        
        // Check if the task is completed
        if (task.completed) {
            li.classList.add("checked");
        }
        
        listContainer.appendChild(li).appendChild(document.createElement("span")).innerHTML = "\u00d7";
    });
    updateTaskCounter();
}

showList();