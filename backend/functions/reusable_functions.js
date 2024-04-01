import jwt from "jsonwebtoken";

const getDataFromToken = (token) => {
  try {
    const data = jwt.verify(token, process.env.PRIVATE_KEY);
    return data;
  } catch (error) {
    return null;
  }
};

export { getDataFromToken };
