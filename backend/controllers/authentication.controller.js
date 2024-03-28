import { validateSignUp } from "../validations/authentications.validation.js";

const signUp = (req, res) => {
  console.log(req.body);
  const { error } = validateSignUp(req.body);
  if (error) {
    return res.json({
      error_message: error.details[0].message,
    });
  }

  // !Everything is good
  return res.json({
    result: "reached",
  });
};

export default signUp;
