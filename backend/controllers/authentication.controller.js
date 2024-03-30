import { validateSignUp } from "../validations/authentications.validation.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
import User from "../models/user.model.js";

const signUp = async (req, res) => {
  const { error } = validateSignUp(req.body);
  if (error) {
    return res.json({
      error_message: error.details[0].message,
    });
  }

  // Hashning password
  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  const hashed_password = await bcrypt.hash(req.body.password, salt);

  await User.create({
    username: req.body.username,
    password: hashed_password,
  });

  return res.json({
    result: "user_has_been_created_successfully",
  });
};

export default signUp;
