const input_username = document.getElementById("input_username");
const input_password = document.getElementById("input_password");
const input_reset_password = document.getElementById("input_reset_password");
const button_sign_up = document.getElementById("button_sign_up");
const result = document.getElementById("result");

const signUp = () => {
  const username = input_username.value;
  const password = input_password.value;
  const reset_password = input_reset_password.value;

  result.classList.add("color-red");

  if (username.length < 3 || username.length > 10) {
    result.innerHTML = "Username must be between 3 and 10";
  } else if (password.length < 6 || password.length > 20) {
    result.innerHTML = "Password must be between 6 and 20";
  } else if (reset_password.length < 6 || reset_password.length > 20) {
    result.innerHTML = "Reset password must be between 6 and 20";
  } else if (password !== reset_password) {
    result.innerHTML = "Password and reset password don't match";
  } else {
    const url = `http://localhost:4002/authentication/sign_up`;
    const body = {
      username: username,
      password: password,
    };
    axios
      .post(url, body)
      .then((response) => {
        result.classList.add("color-red");
        if (response.data.result === "user_has_been_created_successfully") {
          result.classList.remove("color-red");
          result.classList.add("color-green");
          result.innerHTML = "Account created, please sign in";
          input_username.value = "";
          input_password.value = "";
          input_reset_password.value = "";
        } else if (response.data.result === "username_is_taken") {
          result.innerHTML = "Username is taken";
        } else {
          result.classList.remove("color-green");
          result.classList.add("color-red");
          result.innerHTML = "Something went wrong";
        }
      })
      .catch((error) => {
        result.classList.remove("color-green");
        result.classList.add("color-red");
        result.innerHTML = "Something went wrong";
      });
  }
};

button_sign_up.addEventListener("click", signUp);
