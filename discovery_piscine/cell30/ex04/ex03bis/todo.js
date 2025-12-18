$(document).ready(function () {
  const $ftList = $("#ft_list");
  const $newBtn = $("#new");

  function getCookies() {
    const cookies = document.cookie.split("; ");
    for (let c of cookies) {
      if (c.startsWith("todo=")) {
        return JSON.parse(decodeURIComponent(c.substring(5)));
      }
    }
    return [];
  }

  function setCookies(todos) {
    document.cookie =
      "todo=" + encodeURIComponent(JSON.stringify(todos)) + "; path=/";
  }

  function saveTodos() {
    const todos = [];
    $ftList.find("div").each(function () {
      todos.push($(this).text());
    });
    setCookies(todos);
  }

  function createTodo(text) {
    const $div = $("<div></div>").text(text);

    $div.on("click", function () {
      if (confirm("Do you want to delete this TO DO?")) {
        $(this).remove();
        saveTodos();
      }
    });

    // insere no topo da lista
    $ftList.prepend($div);
  }

  $newBtn.on("click", function () {
    const text = prompt("Enter a new TO DO:");
    if (text && text.trim() !== "") {
      createTodo(text.trim());
      saveTodos();
    }
  });

  // carregar todos ao iniciar
  const todos = getCookies();
  todos.forEach(function (todo) {
    createTodo(todo);
  });
});
