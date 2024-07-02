let tasks = [];

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const dueDate = document.getElementById('dueDate');
    const priority = document.getElementById('priority');
    
    if (taskInput.value.trim() !== '') {
        const task = {
            id: Date.now(),
            text: taskInput.value,
            dueDate: dueDate.value,
            priority: priority.value,
            completed: false
        };
        tasks.push(task);
        renderTasks();
        taskInput.value = '';
        dueDate.value = '';
        priority.value = 'low';
    }
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    
    
    tasks.sort((a, b) => {
        const priorityOrder = { low: 3, medium: 2, high: 1 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
    
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task ${task.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <span>${task.text} - ${task.dueDate} - ${task.priority}</span>
            <div class="task-buttons">
                <button onclick="editTask(${task.id})">Edit</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
                <button onclick="toggleComplete(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        const newText = prompt('Edit task', task.text);
        const newDueDate = prompt('Edit due date', task.dueDate);
        const newPriority = prompt('Edit priority (low, medium, high)', task.priority);
        
        if (newText !== null && newText.trim() !== '') {
            task.text = newText;
        }
        if (newDueDate !== null) {
            task.dueDate = newDueDate;
        }
        if (newPriority !== null) {
            task.priority = newPriority;
        }
        
        renderTasks();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

function toggleComplete(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        renderTasks();
    }
}

document.addEventListener('DOMContentLoaded', renderTasks);
