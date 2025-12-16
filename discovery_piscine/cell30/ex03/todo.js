const ftList = document.getElementById("ft_list");
const newBtn = document.getElementById("new");

function getCookies() {
  const cookies = document.cookie.split("; ");
  for (let c of cookies) {
    if (c.startsWith("todo="))
      return JSON.parse(decodeURIComponent(c.substring(5)));
  }
  return [];
}

function setCookies(todos) {
  document.cookie =
    "todo=" + encodeURIComponent(JSON.stringify(todos)) + "; path=/";
}

function createTodo(text) {
  const div = document.createElement("div");
  div.textContent = text;

  div.onclick = () => {
    if (confirm("Do you want to delete this TO DO?")) {
      ftList.removeChild(div);
      saveTodos();
    }
  };

  ftList.insertBefore(div, ftList.firstChild);
}

function saveTodos() {
  const todos = [];
  ftList.querySelectorAll("div").forEach((div) => {
    todos.push(div.textContent);
  });
  setCookies(todos);
}

newBtn.onclick = () => {
  const text = prompt("Enter a new TO DO:");
  if (text && text.trim() !== "") {
    createTodo(text.trim());
    saveTodos();
  }
};

window.onload = () => {
  const todos = getCookies();
  todos.forEach((todo) => createTodo(todo));
};
