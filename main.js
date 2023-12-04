const form = document.getElementById("form");
const formClass = document.querySelector(".form")

let title = document.getElementById("taskTitle");
let date = document.getElementById("taskDate");
let time = document.getElementById("taskTime");
let description = document.getElementById("taskDesc");

let msg = document.getElementById("msg");
let add = document.getElementById("buttonAdd");
let taskstext = document.getElementById("taskstext");

const tasksContainer = document.querySelector("#tasks")
const newTaskBtn = document.querySelector("#newTask")
const task = document.querySelector(".task")

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
    description: description.value,
    done: false
  });

  localStorage.setItem("taskdata", JSON.stringify(data));
  showTask();
  formClass.classList.toggle("displayNone")

}

let showTask = () => {
  tasksContainer.innerHTML = "";
  data.map((x, y) => (tasksContainer.innerHTML += `
      <div id="${y}" class="task ${x.done && "done"}">
      <span id="tasktitle">${x.title}</span>
      <br/>
      <u>${x.date}</u>
      <i>${x.time}</i>
      <details>
      <summary>Show details</summary>
      <p>${x.description}</p>
      </details>
      <div id="options">
      ${x.done ? "" :
      `<button id="done" onClick="doneTask(this)">&#10004;</button>`}
      <button id="edit" onClick ="editTask(this)">&#9998;</button>
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
}

const deleteTask = (e) => {
  e.parentElement.parentElement.remove();

  data.splice(e.parentElement.parentElement.id, 1);

  localStorage.setItem("taskdata", JSON.stringify(data));

}

const editTask = (e) => {
  formClass.classList.toggle("displayNone")
  let task = e.parentElement.parentElement;

  title.value = task.children[0].innerHTML;
  date.value = task.children[2].innerHTML;
  time.value = task.children[3].innerHTML;
  //*We do different calling method for not see html codes in inside of textarea
  description.value = task.children[4]?.children[1]?.innerHTML;

  add.innerHTML = "&#10004;Save";
  deleteTask(e);
}

const doneTask = (e) => {
  let task = e.parentElement.parentElement;

  task.classList.toggle("done")

  const title = task.children[0].innerHTML;
  const date = task.children[2].innerHTML;
  const time = task.children[3].innerHTML;
  const description = task.children[4]?.children[1]?.innerHTML;

  deleteTask(e);

  data.push({
    title: title,
    date: date,
    time: time,
    description: description,
    done: true
  });

  localStorage.setItem("taskdata", JSON.stringify(data));
  showTask();
}

//*Invoke tasks from local stroage
(() => {
  data = JSON.parse(localStorage.getItem("taskdata")) || [];
  console.log(data);
  showTask();
  formClass.classList.add("displayNone")
})();
