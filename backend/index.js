import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

import authenticationRoutes from "./routes/authentications.route.js";
app.use("/authentication", authenticationRoutes);

app.listen(process.env.PORT, () => {
  console.log(`I'm listening to port ${process.env.PORT}`);
});
