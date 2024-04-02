const textarea_update_todo = document.getElementById("textarea_update_todo");
const button_update_todo = document.getElementById("button_update_todo");
const result = document.getElementById("result");

if (!localStorage.getItem("last_todo_title")) {
  window.location.href = "./all_todos.html";
}

// Get title from last todo

textarea_update_todo.value = localStorage.getItem("last_todo_title");
const todo_id = localStorage.getItem("last_todo_id");

// Get data from token
const cookies = decodeURIComponent(document.cookie);
const array = cookies.split("; ");
let token;
array.forEach((element) => {
  const array = element.split("=");
  if (array[0] === "token") {
    token = array[1];
  }
});

const updateTodo = () => {
  const title = textarea_update_todo.value;

  result.classList.add("color-red");
  if (title.length < 5 || title.length > 100) {
    result.innerHTML = "Title must be between 5 and 100 characters";
  } else {
    const url = `http://localhost:4002/todo/update/${todo_id}`;
    const body = {
      title,
    };

    axios
      .put(url, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.result === "todo_updated") {
          window.location.href = "./all_todos.html";
        } else {
          result.classList.remove("color-green");
          result.classList.add("color-red");
          result.innerHTML = "Something went wrong";
        }
      })
      .catch(() => {
        result.classList.remove("color-green");
        result.classList.add("color-red");
        result.innerHTML = "Something went wrong";
      });
  }
};

button_update_todo.addEventListener("click", updateTodo);
