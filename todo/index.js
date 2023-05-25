const form = document.querySelector("#todo-form");
const todoList = document.querySelector("#todo-list");
const ul = document.createElement("ul");
todoList.append(ul);

let id = 0;
let editChild = null;
let editMode = false;
const todoInput = document.querySelector("#todo-input");
const submit = document.querySelector("#submit");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo(todoInput.value);
  todoInput.value = "";
});

function addTodo(todo) {
  if (editMode) {
    editChild.textContent = todo;
    editMode = false;
    editChild = null;
    submit.textContent = "Add";
    return;
  }
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = todo;
  const del = document.createElement("button");
  del.textContent = "delete";
  const edit = document.createElement("button");
  edit.textContent = "edit";
  li.append(...[span, del, edit]);
  ul.append(li);
  del.onclick = function (e) {
    ul.removeChild(li);
  };
  edit.onclick = function (e) {
    editMode = true;
    editChild = span;
    todoInput.value = todo;
    submit.textContent = "Edit";
  };
}
