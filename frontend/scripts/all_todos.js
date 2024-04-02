const no_todos = document.getElementById("no_todos");
const todos_container = document.getElementById("todos_container");

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

const checkTodoNumber = () => {
  todos_number--;
  if (todos_number === 0) {
    no_todos.classList.remove("color-red");
    no_todos.classList.remove("display-none");
    no_todos.classList.add("color-blue");
    no_todos.innerHTML = "No Todos Yet";
  }
};

let todos_number = 0;

const url = "http://localhost:4002/todo";
axios
  .get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then((res) => {
    if (res.data.result === "done") {
      todos_number = res.data.todos.length;
      if (res.data.todos.length === 0) {
        no_todos.classList.add("color-blue");
        no_todos.innerHTML = "No Todos Yet";
      } else {
        // Remove no_todos tag from DOM
        no_todos.classList.add("display-none");

        // Adding todos to the article container
        const todos = res.data.todos;
        for (let i = 0; i < todos.length; i++) {
          // Create the todo cotainer
          const section = document.createElement("section");
          // Add all classes needed for todo container
          section.classList.add(
            "todo",
            "flex",
            "flex-column",
            "j-c-c",
            "a-i-c"
          );

          // ---------------------------------------------------
          // Create the todo title
          const h2 = document.createElement("h2");
          h2.innerHTML = todos[i].title;
          section.appendChild(h2);

          // ---------------------------------------------------
          // Create the todo date
          const h4 = document.createElement("h4");
          h4.classList.add("w-100");
          h4.innerHTML = new Date(todos[i].date).toLocaleString();
          section.appendChild(h4);

          // ---------------------------------------------------
          // Create div container for the buttons
          const div = document.createElement("div");
          div.classList.add("mt-20", "flex", "j-c-s-e", "w-100");
          // Create 1st button
          const buttonView = document.createElement("button");
          buttonView.innerHTML = "View";

          buttonView.addEventListener("click", () => {
            localStorage.setItem("last_todo_title", todos[i].title);
            localStorage.setItem("last_todo_id", todos[i]._id);
            window.location.href = "./update_todo.html";
          });

          // Create 2nd button
          const buttonDelete = document.createElement("button");
          buttonDelete.innerHTML = "Delete";

          buttonDelete.addEventListener("click", () => {
            const url = `http://localhost:4002/todo/${todos[i]._id}`;
            axios
              .delete(url, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((res) => {
                if (res.data.result === "todo_deleted") {
                  todos_container.removeChild(section);
                  checkTodoNumber();
                }
              });
          });

          // Add two buttons to div
          div.appendChild(buttonView);
          div.appendChild(buttonDelete);

          //Add div to section
          section.appendChild(div);

          //Add section to todos_container
          todos_container.appendChild(section);
        }
      }
    } else {
      no_todos.classList.remove("color-blue");
      no_todos.classList.add("color-red");
      no_todos.innerHTML = "Something went wrong";
    }
  })

  .catch(() => {
    no_todos.classList.remove("color-blue");
    no_todos.classList.remove("display-none");
    no_todos.classList.add("color-red");
    no_todos.innerHTML = "Something went wrong";
  });
