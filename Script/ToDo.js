let tasks = [];

function addTask(taskText) {
    if (taskText.trim()) { 
        tasks.push({ text: taskText, completed: false }); 
        createTaskElement(taskText, tasks.length - 1); 
        saveTasks(); 
    }
}

function createTaskElement(task, index) {
    const taskList = document.getElementById('taskList'); 
    const li = document.createElement('li'); 
    li.textContent = task; 

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить'; 
    deleteButton.onclick = function() { 
        removeTask(index); 
        li.remove();
    };

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox'; 
    checkbox.onchange = function() { 
        tasks[index].completed = checkbox.checked; 
        saveTasks();
    };

    li.prepend(checkbox);
    li.append(deleteButton);
    taskList.append(li);
}

function removeTask(index) {
    tasks.splice(index, 1);
    saveTasks();
}

document.getElementById('taskInput').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') { 
        addTask(this.value); 
        this.value = ''; //
    }
});

document.getElementById('addButton').addEventListener('click', function() {
    const taskInput = document.getElementById('taskInput'); 
    addTask(taskInput.value); 
    taskInput.value = ''; 
});

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Преобразуем массив tasks в строку JSON и сохраняем в localStorage под ключом tasks
}

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')); // Получаем строку JSON из localStorage и преобразуем её обратно в массив
    if (savedTasks) { 
        tasks = savedTasks;
        tasks.forEach((task, index) => createTaskElement(task.text, index)); 
    }
}

window.onload = function() {
    loadTasks(); 
    if (tasks.length === 0) { 
        addTask('Первая задача'); 
        addTask('Вторая задача'); 
        addTask('Третья задача'); 
    }
};

function removeAllTasks() {
    tasks = []; 
    document.getElementById('taskList').innerHTML = ''; 
    localStorage.removeItem('tasks'); 
}

document.getElementById('removeAllButton').onclick = removeAllTasks;