let tasks = [];

function addTask(taskText) {
    if (taskText.trim()) {
        tasks.push({ text: taskText, completed: false });
        createTaskElement(taskText, tasks.length - 1);
        updateTaskCount();
        updateProgressBar();
        saveTasks();
    }
}

function createTaskElement(task, index) {
    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    li.textContent = task;
    li.classList.add('editable');

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.onclick = function() {
        removeTask(index);
        li.remove();
        updateTaskCount();
        updateProgressBar();
    };

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.onchange = function() {
        tasks[index].completed = checkbox.checked;
        updateProgressBar();
        saveTasks();
    };

    li.prepend(checkbox);
    li.append(deleteButton);
    taskList.insertBefore(li, taskList.querySelector('.add-task'));

    li.addEventListener('click', () => {
        const newText = prompt('Edit task text:', task);
        if (newText !== null) {
            tasks[index].text = newText;
            li.childNodes[1].nodeValue = newText;
            saveTasks();
        }
    });
}

function removeTask(index) {
    tasks.splice(index, 1);
    saveTasks();
}

function updateTaskCount() {
    document.getElementById('taskCount').textContent = tasks.length;
}

function updateProgressBar() {
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progressBar = document.getElementById('progress-bar');
    if (totalTasks > 0) {
        progressBar.style.width = `${(completedTasks / totalTasks) * 100}%`;
    } else {
        progressBar.style.width = '0%';
    }
}

document.getElementById('tasks').addEventListener('click', function() {
    const taskList = document.getElementById('taskList');
    taskList.style.display = taskList.style.display === 'none' ? 'block' : 'none';
});

document.getElementById('addTaskButton').addEventListener('click', function() {
    const taskInput = document.getElementById('newTask');
    addTask(taskInput.value);
    taskInput.value = '';
});
document.querySelectorAll('.editable').forEach(element => {
    element.addEventListener('click', () => {
        const newText = prompt('Edit text:', element.textContent);
        if (newText !== null) {
            element.textContent = newText;
        }
    });
});

document.getElementById('favorite-star').addEventListener('click', () => {
    const star = document.getElementById('favorite-star');
    star.textContent = star.textContent === '⭐' ? '☆' : '⭐';
});

document.getElementById('deadline').addEventListener('click', () => {
    const newDeadline = prompt('Введите новую дату (дд-мм-гггг):');
    if (newDeadline !== null) {
        document.getElementById('deadline').textContent = `Дедлайн: ${newDeadline}`;
    }
});

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
        tasks = savedTasks;
        tasks.forEach((task, index) => createTaskElement(task.text, index));
        updateTaskCount();
        updateProgressBar();
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
    updateTaskCount();
    updateProgressBar();
    localStorage.removeItem('tasks');
}

document.getElementById('removeAllButton').onclick = removeAllTasks;