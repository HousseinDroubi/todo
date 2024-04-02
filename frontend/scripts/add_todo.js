const textarea_add_todo = document.getElementById("textarea_add_todo");
const button_add_todo = document.getElementById("button_add_todo");
const result = document.getElementById("result");

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

const addTodo = () => {
  const title = textarea_add_todo.value;

  result.classList.add("color-red");
  if (title.length < 5 || title.length > 100) {
    result.innerHTML = "Title must be between 5 and 100 characters";
  } else {
    const url = `http://localhost:4002/todo/add`;
    const body = {
      title,
    };

    axios
      .post(url, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.result === "todo_added") {
          result.classList.remove("color-red");
          result.classList.add("color-green");
          result.innerHTML = "Todo added";
          textarea_add_todo.value = "";
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

button_add_todo.addEventListener("click", addTodo);
