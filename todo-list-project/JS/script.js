document.addEventListener("DOMContentLoaded", function () {
  const todoInput = document.getElementById("todoInput");
  const dateInput = document.getElementById("dateInput");
  const addBtn = document.getElementById("addBtn");
  const deleteAllBtn = document.getElementById("deleteAllBtn");
  const todoTable = document.getElementById("todoTable");

  let todos = [];

  function renderTodos() {
    todoTable.innerHTML = "";
    if (todos.length === 0) {
      todoTable.innerHTML = `<tr><td colspan="4">No task found</td></tr>`;
      return;
    }

    todos.forEach((todo, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${todo.task}</td>
        <td>${todo.date}</td>
        <td>${todo.done ? "Done" : "Pending"}</td>
        <td>
          <button onclick="markDone(${index})">✔️</button>
          <button onclick="deleteTodo(${index})">🗑️</button>
        </td>
      `;
      todoTable.appendChild(row);
    });
  }

  function addTodo() {
    const task = todoInput.value.trim();
    const date = dateInput.value;
    if (task === "" || date === "") {
      alert("Please fill in both fields!");
      return;
    }

    todos.push({ task, date, done: false });
    todoInput.value = "";
    dateInput.value = "";
    renderTodos();
  }

  function deleteTodo(index) {
    todos.splice(index, 1);
    renderTodos();
  }

  function markDone(index) {
    todos[index].done = !todos[index].done;
    renderTodos();
  }

  function deleteAll() {
    todos = [];
    renderTodos();
  }

  addBtn.addEventListener("click", addTodo);
  deleteAllBtn.addEventListener("click", deleteAll);

  renderTodos();

  // expose global functions
  window.markDone = markDone;
  window.deleteTodo = deleteTodo;
});
