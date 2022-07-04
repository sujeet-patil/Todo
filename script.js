const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUL = document.getElementById("todos");

const todos = JSON.parse(localStorage.getItem("todosString"));

if(todos){
  todos.forEach(todo => addTodo(todo));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  addTodo();
})

function addTodo(todo){
  let todoText = input.value;
  if(todo){
    todoText = todo.text;
  }
  if(todoText){
    const todoEl = document.createElement("li");
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("task");
    const remDiv = document.createElement("div");

    if(todo && todo.isCompleted){
      todoDiv.classList.add("completed");
    }

    todoDiv.innerText = todoText;
    remDiv.classList.add("fa");
    remDiv.classList.add("fa-close");
    todoDiv.addEventListener("click", () =>{
      todoDiv.classList.toggle("completed");
      updateLS();
    })

    todoEl.addEventListener("contextmenu", (e)=>{
      e.preventDefault();

      todoEl.remove();
      updateLS();
    })

    remDiv.addEventListener('click', ()=>{
      todoEl.remove();
      updateLS();
    })

    todoEl.appendChild(todoDiv);
    todoEl.appendChild(remDiv);
    todosUL.appendChild(todoEl);
    input.value="";
    updateLS();
  }}

function updateLS(){
  const todosEls = document.querySelectorAll(".task");
  const todos = [];
  todosEls.forEach(todoEl => {
    todos.push({
      text: todoEl.innerText,
      isCompleted : todoEl.classList.contains("completed")
    })
  })
  localStorage.setItem("todosString", JSON.stringify(todos));
}