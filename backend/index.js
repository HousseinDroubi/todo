import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/authentication/sign_up", (req, res) => {
  console.log(req.body);
  return res.json({ result: "You have reached me successfully" });
});

app.listen(process.env.PORT, () => {
  console.log(`I'm listening to port ${process.env.PORT}`);
});
