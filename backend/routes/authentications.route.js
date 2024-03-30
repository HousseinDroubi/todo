import { Router } from "express";
import { signUp, signIn } from "../controllers/authentication.controller.js";

const router = Router();

router.post("/sign_up", signUp);
router.post("/sign_in", signIn);

export default router;
