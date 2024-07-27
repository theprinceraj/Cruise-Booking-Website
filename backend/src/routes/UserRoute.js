import express from "express";
import * as UserController from "../controllers/User.js";
import { sessionStatusController } from "../controllers/SessionStatus.js";
import { validateSession } from "../middlewares/sessionAuth.js";

const router = express.Router();

router.post("/user/login", UserController.loginUser);
router.put("/user/signup", UserController.signupUser);
router.post("/user/logout", UserController.logOutUser);

router.delete("/user/:userId", validateSession, UserController.deleteUser);
router.post("/user/verify/:userId", UserController.verifyUserEmail);

router.get("/user/session-status", sessionStatusController);

export default router;
