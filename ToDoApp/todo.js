let tasks = [];
const tasksList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

function fetchToDos() {
  //GET request
  fetch("https://jsonplaceholder.typicode.com/todos")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      tasks = data.slice(0, 10);
      renderList();
    })
    .catch(function (error) {
      console.log('error' + error);
    })
}
function addTaskToDOM(task) {
  var li = document.createElement("li");
  li.innerHTML = `
  
  <input type="checkbox" id="${task.id}"  ${task.completed ? "checked" : ""} class="custom-checkbox">
  <label for="${task.id}">${task.title}</label>
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSolJGbz1ber6PHaCWd8Cfv8hIqNfKNefcYEgavlnNtmjbGSe8u84woBO5oavGtTRxUU7Q&usqp=CAU" class="delete" data-id="${task.id}" />

  `
  tasksList.append(li);
}
function renderList() {
  tasksList.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    addTaskToDOM(tasks[i]);
  }
  tasksCounter.innerHTML = tasks.length;
}

function toggleTask(taskId) {
  let task = tasks.filter(function (task) {
    return task.id == Number(taskId);
  });
  if (task.length > 0) {
    let currentTask = task[0];
    currentTask.completed = !currentTask.completed;
    showNotification("Task is toggled successfully");
    renderList();
    return;
  }
  showNotification("Task cannot be toggled ");
}

function deleteTask(taskId) {
  let newTask = tasks.filter(function (task) {
    return task.id !== Number(taskId);
  })

  tasks = newTask;
  renderList();
  showNotification("Taks deleted successfully");
}

function addTask(task) {
  if (task) {
    tasks.push(task);
    renderList();
    showNotification("Task added successfully");

  }
  else {
    showNotification("Task cannot be added");
  }

}

function showNotification(text) {
  alert(text);
}

function handleInputKeypress(e) {
  if (e.key === 'Enter') {
    const text = e.target.value;
    // console.log(text);
    if (!text) {
      showNotification("Task text can not be empty");
      return;
    }

    const task = {
      title: text,
      id: Date.now(),
      completed: false,
    };
    e.target.value = "";
    addTask(task);
  }
}
function handleClickListner(e) {
  const target = e.target;

  if (target.className === 'delete') {
    const taskId = target.dataset.id;
    deleteTask(taskId);
    return;
  }
  else if (target.className === 'custom-checkbox') {
    const taskId = target.id;
    toggleTask(taskId);
    return;
  }
}

function initializeApp() {
  fetchToDos();
  addTaskInput.addEventListener("keyup", handleInputKeypress);
  document.addEventListener("click", handleClickListner);
}
initializeApp();
