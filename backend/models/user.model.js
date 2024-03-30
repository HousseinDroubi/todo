import mongoose from "mongoose";

const user_schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("users", user_schema);
export default User;
