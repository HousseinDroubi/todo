const input_username = document.getElementById("input_username");
const input_password = document.getElementById("input_password");
const button_sign_in = document.getElementById("button_sign_in");
const result = document.getElementById("result");

const signIn = () => {
  const username = input_username.value;
  const password = input_password.value;
  result.classList.add("color-red");
  if (username.length < 3 || username.length > 10) {
    result.innerHTML = "Username must be between 3 and 10";
  } else if (password.length < 6 || password.length > 20) {
    result.innerHTML = "Password must be between 6 and 20";
  } else {
    const url = `http://localhost:4002/authentication/sign_in`;
    const body = {
      username: username,
      password: password,
    };
    axios
      .post(url, body)
      .then((response) => {
        result.classList.add("color-red");
        if (response.data.result === "username_or_password_are_wrong") {
          result.innerHTML = "Username or password are wrong";
        } else if (response.data.result === "done") {
          const seven_days = 60 * 60 * 24 * 7;
          document.cookie = `token=${response.data.token}; max-age=${seven_days}`;
          document.cookie = `username=${input_username.value}; max-age=${seven_days}`;

          input_username.value = "";
          input_password.value = "";
          window.location.href = "./all_todos.html";
        } else {
          result.classList.add("color-red");
          result.innerHTML = "Something went wrong";
        }
      })
      .catch(() => {
        result.classList.add("color-red");
        result.innerHTML = "Something went wrong";
      });
  }
};

button_sign_in.addEventListener("click", signIn);
