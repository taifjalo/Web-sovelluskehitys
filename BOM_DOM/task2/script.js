// array for todo list
const todoList = [
  {
    id: 1,
    task: 'Learn HTML',
    completed: true,
  },
  {
    id: 2,
    task: 'Learn CSS',
    completed: true,
  },
  {
    id: 3,
    task: 'Learn JS',
    completed: false,
  },
  {
    id: 4,
    task: 'Learn TypeScript',
    completed: false,
  },
  {
    id: 5,
    task: 'Learn React',
    completed: false,
  },
];

// Step 1: get the ul element from the DOM:
const ul = document.getElementById("todoList");

// Step 2: Loop through the todoList array and create li elements for each task:
todoList.forEach(item => {

  // Step 3: Crreate li element
  const li = document.createElement("li");
  const input = document.createElement("input");
  const label = document.createElement("label");
  
  // Step 4: Create checkbox for each task and set its properties
  input.type = "checkbox";
  input.id = `task-${item.id}`;
  input.checked = item.completed;
  
  // Step 5: Create label for each task and set its properties
  label.htmlFor = `task-${item.id}`;
  label.textContent = item.task;
  
  // Step 6: Append checkbox and label to the li element
  li.appendChild(input);
  li.appendChild(label);
  
  // Step 7: Append the li element to the ul
  ul.appendChild(li);
});
