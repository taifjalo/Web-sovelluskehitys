
// array for todo list
const todoList = [
  { id: 1, task: 'Learn HTML', completed: true },
  { id: 2, task: 'Learn CSS', completed: true },
  { id: 3, task: 'Learn JS', completed: false },
  { id: 4, task: 'Learn TypeScript', completed: false },
  { id: 5, task: 'Learn React', completed: false },
];


// getting DOM elements
const ul = document.getElementById("todoList");
const openDialog = document.getElementById('openDialog');
const dialog = document.getElementById('dialog');
const form = document.querySelector('form');
const formInput = document.getElementById('formInput');

//  function to render the todo list
function renderList() {
  ul.innerHTML = ''; // clear existing list before re-rendering 
  todoList.forEach(item => {
    const li = document.createElement("li");
    const input = document.createElement("input");
    const label = document.createElement("label");
    const deleteBtn = document.createElement("button");

    // checkbox
    input.type = "checkbox";
    input.id = `task-${item.id}`;
    input.checked = item.completed;
    input.addEventListener('change', function () {
      item.completed = this.checked;
      console.log(todoList);
    });

    // label
    label.htmlFor = input.id;
    label.textContent = item.task;

    // delete
    deleteBtn.textContent = '❌';
    deleteBtn.addEventListener('click', function () {  // delete the item from the todoList array but still showing on the Frontend UI. 
      const index = todoList.findIndex(todo => todo.id === item.id);
      if (index !== -1) {
        todoList.splice(index, 1);
        renderList(); // re-render the list after deletion 
        console.log(todoList);
      }
    });

    //  append elements
    li.appendChild(input);
    li.appendChild(label);
    li.appendChild(deleteBtn);
    ul.appendChild(li);
  });
}

// 3️ initial render
renderList();

// when click on 'Add New Item' dialog open event listener 
openDialog.addEventListener('click', () => {
  dialog.showModal();
});

// form submission event listener to add new todo item to the list.
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const newTask = formInput.value.trim();
  if (newTask) {
    const newTodo = {
      id: todoList.length ? todoList[todoList.length - 1].id + 1 : 1,
      task: newTask,
      completed: false,
    };
    todoList.push(newTodo);
    renderList();
    console.log(todoList);
    formInput.value = '';
    dialog.close();
  }
});
