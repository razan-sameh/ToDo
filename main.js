let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasks = document.querySelector(".tasks");

let TasksOfArray = [];

//this fill the array by data if there data in local storage
if (localStorage.getItem("task")) {
    TasksOfArray = JSON.parse(localStorage.getItem("task"));
}

//get the element ftom local storage and show it on website
GetLocalStorage();

submit.onclick = function () {
    if (input.value !== "") {
        AddTaskToArray(input.value);
        input.value = "";
    }
}
tasks.addEventListener("click",(e) => {
    if (e.target.classList.contains("del")) {
        DelTaskFromLocalstorage(e.target.parentElement.getAttribute("data-id"));
        e.target.parentElement.remove();
    }
    if (e.target.classList.contains("task")) {
        togglestatus(e.target.getAttribute("data-id"));
        e.target.classList.toggle("done");
    }
})
function AddTaskToArray(Text) {
    const task = {
        id : Date.now(),
        title : Text,
        completed : false
    }
    TasksOfArray.push(task);
    AddElementToPage(TasksOfArray);
    AddTasksToLocalStorage(TasksOfArray);
}

function AddElementToPage(TasksOfArray) {
    tasks.innerHTML = "";
    TasksOfArray.forEach(element => {
        let task = document.createElement("div");
        task.setAttribute("class","task");
        if (element.completed === true) {
            task.className = "task done";
        }
        task.setAttribute("data-id",element.id);
        task.innerHTML = element.title;
        tasks.appendChild(task);
        let delbtn = document.createElement("span");
        delbtn.innerHTML = "Delete";
        delbtn.className = "del";
        task.appendChild(delbtn);
    });
}

function AddTasksToLocalStorage(TasksOfArray) {
    window.localStorage.setItem("task",JSON.stringify(TasksOfArray));
}

function GetLocalStorage() {
    //put the data string in variable
    let data = window.localStorage.getItem("task");
    //check if there is data
    if (data) {
        //convert the data string to data object to can show it on website
        let tasks = JSON.parse(data);
        AddElementToPage(tasks);
    }
}

function DelTaskFromLocalstorage(id){
    //delete the object that equal to id from array then update the localstorge from the array 
    TasksOfArray = TasksOfArray.filter((ele) => ele.id != id);
    AddTasksToLocalStorage(TasksOfArray);
}

function togglestatus(id){
    TasksOfArray.forEach(ele => {
        if(ele.id == id){
            ele.completed == false ? (ele.completed = true) : (ele.completed = false);
        }
    });
    AddTasksToLocalStorage(TasksOfArray);
}