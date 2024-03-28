import { Router } from "express";
import signUp from "../controllers/authentication.controller.js";

const router = Router();

router.post("/sign_up", signUp);

export default router;
