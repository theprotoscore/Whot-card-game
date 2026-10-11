// 1. Initial array of tasks
let todos = [
  { id: "1", text: "Write some code" },
  { id: "2", text: "Test the delete button" },
];

const listElement = document.getElementById("todo-list");

// 2. Function to render the list to the DOM
function render() {
  listElement.innerHTML = ""; // Clear current list
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = todo.text + " ";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    // 3. Attach click event to delete
    deleteBtn.onclick = () => {
      deleteTodo(todo.id);
    };

    li.appendChild(deleteBtn);
    listElement.appendChild(li);
  });
}

// 4. Function to filter out the deleted item and re-render
function deleteTodo(id) {
  todos = todos.filter((item) => item.id !== id);
  render(); // Automatically updates the screen
}

// Initial render on page load
render();
