const input_username = document.getElementById("input_username");
const button_update_username = document.getElementById(
  "button_update_username"
);
const result = document.getElementById("result");

// Get data from token
const cookies = decodeURIComponent(document.cookie);
const array = cookies.split("; ");
let token;
let username;
array.forEach((element) => {
  const array = element.split("=");
  if (array[0] === "username") {
    username = array[1];
  } else if (array[0] === "token") {
    token = array[1];
  }
});

input_username.value = username;

const updateUsername = () => {
  const username_value = input_username.value;

  result.classList.add("color-red");

  if (username_value.length < 3 || username_value.length > 10) {
    result.innerHTML = "Username must be between 3 and 10";
  } else {
    // Sending request
    const url = `http://localhost:4002/authentication/update_username`;
    const body = {
      username: username_value,
    };

    axios
      .put(url, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.result === "username_is_taken") {
          result.classList.remove("color-green");
          result.classList.add("color-red");
          result.innerHTML = "Username is taken";
        } else if (res.data.result === "username_updated") {
          const seven_days = 60 * 60 * 24 * 7;
          document.cookie = `username=${input_username.value}; max-age=${seven_days}`;

          result.classList.remove("color-red");
          result.classList.add("color-green");
          result.innerHTML = "Username updated";
        } else {
          result.classList.remove("color-green");
          result.classList.add("color-red");
          result.innerHTML = "Something went wrong";
        }
      })
      .catch((err) => {
        result.classList.remove("color-green");
        result.classList.add("color-red");
        result.innerHTML = "Something went wrong";
      });
  }
};

button_update_username.addEventListener("click", updateUsername);
