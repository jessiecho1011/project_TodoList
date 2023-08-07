let listView = document.querySelector(".list");
let add = document.querySelector("form button");
loadData();
add.addEventListener("click", (e) => {
  e.preventDefault();

  //get the input values
  let form = e.target.parentElement;
  let task = form.children[0].value;
  let date = form.children[1].value;
  let token = 0;
  if (task === "" || date === "") {
    alert("Task and Date do not empty.");
    return;
  }

  //creat a todo
  let todo = document.createElement("div");
  todo.classList.add("todo");
  let todoTask = document.createElement("p");
  todoTask.classList.add("todoTask");
  todoTask.innerText = task;
  let todoDate = document.createElement("p");
  todoDate.classList.add("todoDate");
  todoDate.innerText = date;
  let todoText = document.createElement("div");
  todoText.classList.add("todoText");
  todoText.appendChild(todoTask);
  todoText.appendChild(todoDate);
  todo.appendChild(todoText);

  //creat check and delete button
  let btn = document.createElement("div");
  btn.classList.add("todoBtn");
  let check = document.createElement("button");
  check.classList.add("check");
  check.innerHTML = '<i class="fa-solid fa-check"></i>';
  check.addEventListener("click", (e) => {
    let text = e.target.parentElement.parentElement;
    text.classList.toggle("down");
  });

  let del = document.createElement("button");
  del.classList.add("del");
  del.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
  del.addEventListener("click", (e) => {
    let todoItem = e.target.parentElement.parentElement;
    todoItem.addEventListener("animationend", () => {
      //remove from localstorage
      let task = todoItem.children[0].children[0].innerText;
      let myListArray = JSON.parse(localStorage.getItem("list"));
      myListArray.forEach((item, index) => {
        if (item.task == task) {
          myListArray.splice(index, 1);
          localStorage.setItem("list", JSON.stringify(myListArray));
        }
      });
      todoItem.remove();
    });
    todoItem.style.animation = "scaleDown 0.3s forwards";
  });

  btn.appendChild(check);
  btn.appendChild(del);
  todo.appendChild(btn);

  todo.style.animation = "scaleUp 0.3s forwards";

  //creat oa object
  let myTodo = {
    task: task,
    date: date,
    token: token,
  };

  // store data into array of objects
  let storeList = localStorage.getItem("list");
  if (storeList == null) {
    localStorage.setItem("list", JSON.stringify([myTodo]));
  } else {
    let myListArray = JSON.parse(storeList);
    myListArray.push(myTodo);
    localStorage.setItem("list", JSON.stringify(myListArray));
  }

  form.children[0].value = "";
  form.children[1].value = "";

  listView.appendChild(todo);
});

function loadData() {
  let myList = localStorage.getItem("list");
  if (myList !== null) {
    let myListArray = JSON.parse(myList);
    myListArray.forEach((item, index) => {
      let todo = document.createElement("div");
      todo.classList.add("todo");
      if (myListArray[index].token === 1) {
        todo.classList.add("down");
      }

      let todoTask = document.createElement("p");
      todoTask.classList.add("todoTask");
      todoTask.innerText = item.task;
      let todoDate = document.createElement("p");
      todoDate.classList.add("todoDate");
      todoDate.innerText = item.date;
      let todoText = document.createElement("div");
      todoText.classList.add("todoText");
      todoText.appendChild(todoTask);
      todoText.appendChild(todoDate);
      todo.appendChild(todoText);

      //creat check and delete button
      let btn = document.createElement("div");
      btn.classList.add("todoBtn");
      let check = document.createElement("button");
      check.classList.add("check");
      check.innerHTML = '<i class="fa-solid fa-check"></i>';
      check.addEventListener("click", (e) => {
        let task = e.target.parentElement.parentElement;
        let taskName = task.children[0].children[0].innerText;
        task.classList.toggle("down", downOrNot(taskName));
      });

      let del = document.createElement("button");
      del.classList.add("del");
      del.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
      del.addEventListener("click", (e) => {
        let todoItem = e.target.parentElement.parentElement;
        todoItem.addEventListener("animationend", () => {
          //remove from localstorage
          let task = todoItem.children[0].children[0].innerText;
          let myListArray = JSON.parse(localStorage.getItem("list"));
          myListArray.forEach((item, index) => {
            if (item.task == task) {
              myListArray.splice(index, 1);
              localStorage.setItem(
                "list",
                JSON.stringify(myListArray)
              );
            }
          });
          todoItem.remove();
        });
        todoItem.style.animation = "scaleDown 0.3s forwards";
      });

      btn.appendChild(check);
      btn.appendChild(del);
      todo.appendChild(btn);
      listView.appendChild(todo);
    });
  }
}

function dateSort() {
  let myList = localStorage.getItem("list");
  let myListArray = JSON.parse(myList);

  myListArray = myListArray.sort(function (a, b) {
    return a.date > b.date ? 1 : -1;
  });
  localStorage.setItem("list", JSON.stringify(myListArray));
}

let sortButton = document.querySelector(".sort button");
sortButton.addEventListener("click", () => {
  dateSort();
  let len = listView.children.length;
  for (let i = 0; i < len; i++) {
    listView.children[0].remove();
  }

  loadData();
});

function downOrNot(task) {
  let myListArray = JSON.parse(localStorage.getItem("list"));
  myListArray.forEach((item, index) => {
    if (item.task == task) {
      if (myListArray[index].token == 1) {
        myListArray[index].token = 0;
      } else if (myListArray[index].token == 0) {
        myListArray[index].token = 1;
      }
      localStorage.setItem("list", JSON.stringify(myListArray));
    }
  });
}
