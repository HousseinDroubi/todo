const input_old_password = document.getElementById("input_old_password");
const input_new_password = document.getElementById("input_new_password");
const input_reset_password = document.getElementById("input_reset_password");
const button_update_password = document.getElementById(
  "button_update_password"
);
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

const updatePassword = () => {
  const old_password = input_old_password.value;
  const new_password = input_new_password.value;
  const reset_password = input_reset_password.value;

  result.classList.add("color-red");

  if (old_password.length < 6 || old_password.length > 20) {
    result.innerHTML = "Password must be between 6 and 20";
  } else if (new_password.length < 6 || new_password.length > 20) {
    result.innerHTML = "New password must be between 6 and 20";
  } else if (reset_password.length < 6 || reset_password.length > 20) {
    result.innerHTML = "Reset password must be between 6 and 20";
  } else if (new_password !== reset_password) {
    result.innerHTML = "New password and reset password don't match";
  } else {
    const url = `http://localhost:4002/authentication/update_password`;
    const body = {
      old_password,
      new_password,
    };
    axios
      .put(url, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.result === "old_password_is_wrong") {
          result.classList.remove("color-green");
          result.classList.add("color-red");
          result.innerHTML = "Old password is wrong";
        } else if (res.data.result === "password_changed") {
          result.classList.remove("color-red");
          result.classList.add("color-green");
          result.innerHTML = "Password changed";
          input_old_password.value = "";
          input_new_password.value = "";
          input_reset_password.value = "";
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

button_update_password.addEventListener("click", updatePassword);
