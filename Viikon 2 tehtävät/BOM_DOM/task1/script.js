// array for todo list
const todoList = [
  { id: 1, task: 'Learn HTML', completed: true },
  { id: 2, task: 'Learn CSS', completed: true },
  { id: 3, task: 'Learn JS', completed: false },
  { id: 4, task: 'Learn TypeScript', completed: false },
  { id: 5, task: 'Learn React', completed: false },
];

// Step 1: get the ul element from the DOM:
const ul = document.getElementById("todoList");

// Step 2: Loop through the todoList array and create li elements for each task:
todoList.forEach(item => {

  // Step 3: Create a function that returns "checked" if the item is completed, otherwise return an empty string:
  const check = item.completed ? "checked" : "";

  // Step 4: Create the list item HTML with checkbox and label
  const listItem = `
    <li>
      <input type="checkbox" id="todo-${item.id}" ${check}>
      <label for="todo-${item.id}">${item.task}</label>
    </li>
  `;

  // Step 5: Append the list item to the ul element:
  ul.insertAdjacentHTML('beforeend', listItem);
});
