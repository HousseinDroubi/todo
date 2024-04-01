import { getDataFromToken } from "../functions/reusable_functions.js";

const checkToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  const data = getDataFromToken(token);

  if (!data) {
    return res.json({
      result: "invalid_token",
    });
  }

  req.data = data;

  next();
};

export { checkToken };
