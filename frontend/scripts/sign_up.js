const input_username = document.getElementById("input_username");
const input_password = document.getElementById("input_password");
const input_reset_password = document.getElementById("input_reset_password");
const button_sign_up = document.getElementById("button_sign_up");

const signUp = () => {
  const username = input_username.value;
  const password = input_password.value;
  const reset_password = input_reset_password.value;

  if (username.length < 3 || username.length > 10) {
    console.log("Username must be between 3 and 10");
  } else if (password.length < 6 || password.length > 20) {
    console.log("Password must be between 6 and 20");
  } else if (reset_password.length < 6 || reset_password.length > 20) {
    console.log("Reset password must be between 6 and 20");
  } else if (password !== reset_password) {
    console.log("Password and reset password don't match");
  } else {
    const url = `http://localhost:4002/authentication/sign_up`;
    const body = {
      username: username,
      password: password,
    };
    axios
      .post(url, body)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
};

button_sign_up.addEventListener("click", signUp);
