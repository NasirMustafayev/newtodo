let form = document.getElementById("form");
let title = document.getElementById("taskTitle");
let date = document.getElementById("taskDate");
let time = document.getElementById("taskTime");
let description = document.getElementById("taskDesc");
let msg = document.getElementById("msg");
let add = document.getElementById("buttonAdd");
let taskstext = document.getElementById("taskstext");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Clicked");
  
    formValidation();
  });
  
  let formValidation = () => {
    if(title.value === ""){
        msg.innerHTML = "Title can't empty";
        console.log('%c Opssss! ','color:red;font-size: 15px');
    }
    else{
        msg.innerHTML = "";
        console.log('%c Working fine!', 'color:green;font-size:15px');
        saveTask();
    }
  };

  let data =[]

  let saveTask = () =>{
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

  let showTask = () =>{
    tasks.innerHTML = "";
    data.map((x,y) =>(tasks.innerHTML += `
      <div id="${y}">
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
      <hr>
      </div>
      `));
    add.innerHTML="&#10010;Add";
    resetForm();
    checkTaskstext();
    }

    
    let resetForm = () =>{
      title.value = "";
      date.value = "";
      time.value = "";
      description.value = "";
    }

    let deleteTask = (e) => {
      e.parentElement.parentElement.remove();
     
      data.splice(e.parentElement.parentElement.id,1);
  
      localStorage.setItem("taskdata", JSON.stringify(data));
  
      console.log(data);

      checkTaskstext();
  
    }
    let editTask = (e)=>{
      let task = e.parentElement.parentElement;

      title.value = task.children[0].innerHTML;
      date.value = task.children[1].innerHTML;
      time.value = task.children[2].innerHTML;
      //We do different calling method for not see html codes in inside of textarea
      description.value = task.children[3].children[1].innerHTML;

      add.innerHTML="&#10004;Save";
      deleteTask(e);
      checkTaskstext();
    }

    let checkTaskstext =()=>{
      if(data.length===0){
        taskstext.innerHTML="";
      }
      else{
        taskstext.innerHTML="Tasks";
      }
    }

    //Invoke tasks from local stroage
    (() => {
      data = JSON.parse(localStorage.getItem("taskdata")) || [];
      console.log(data);
      showTask();
      checkTaskstext();
    })();
