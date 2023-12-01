const form = document.getElementById("form");
const formClass = document.querySelector(".form")
const title = document.getElementById("taskTitle");
const date = document.getElementById("taskDate");
const time = document.getElementById("taskTime");
const description = document.getElementById("taskDesc");
const msg = document.getElementById("msg");
const add = document.getElementById("buttonAdd");
const taskstext = document.getElementById("taskstext");
const newTaskBtn = document.querySelector("#newTask")

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

newTaskBtn.addEventListener("click", () => {
  formClass.classList.toggle("displayNone")
})

let formValidation = () => {
  if (title.value === "") {
    msg.innerHTML = "Title can't empty";
    console.log('%c Opssss! ', 'color:red;font-size: 15px');
  }
  else {
    msg.innerHTML = "";
    console.log('%c Working fine!', 'color:green;font-size:15px');
    saveTask();
  }
};

let data = []

let saveTask = () => {
  data.push({
    title: title.value,
    date: date.value,
    time: time.value,
    description: description.value
  });

  localStorage.setItem("taskdata", JSON.stringify(data));
  console.log(data);
  showTask();
}

let showTask = () => {
  tasks.innerHTML = "";
  data.map((x, y) => (tasks.innerHTML += `
      <div id="${y}" class="task">
      <span id="tasktitle">${x.title}</span>
      <u>${x.date}</u>
      <i>${x.time}</i>
      <details>
      <summary>Show details</summary>
      <p>${x.description}</p>
      </details>
      <div id="options">
      <button id="delete" onClick ="editTask(this)">&#9998;</button>
      <button id="delete" onClick ="deleteTask(this)">&#10006;</button>
      </div>
      </div>
      `));
  add.innerHTML = "&#10010;Add";
  resetForm();
}


let resetForm = () => {
  title.value = "";
  date.value = "";
  time.value = "";
  description.value = "";
  formClass.classList.toggle("displayNone")
}

let deleteTask = (e) => {
  e.parentElement.parentElement.remove();

  data.splice(e.parentElement.parentElement.id, 1);

  localStorage.setItem("taskdata", JSON.stringify(data));

  console.log(data);


}
let editTask = (e) => {
  formClass.classList.toggle("displayNone")
  let task = e.parentElement.parentElement;

  title.value = task.children[0].innerHTML;
  date.value = task.children[1].innerHTML;
  time.value = task.children[2].innerHTML;
  //We do different calling method for not see html codes in inside of textarea
  description.value = task.children[3].children[1].innerHTML;

  add.innerHTML = "&#10004;Save";
  deleteTask(e);
}

//Invoke tasks from local stroage
(() => {
  data = JSON.parse(localStorage.getItem("taskdata")) || [];
  console.log(data);
  showTask();
  formClass.classList.add("displayNone")
})();
