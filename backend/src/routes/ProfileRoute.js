import express from "express";
import * as ProfileController from "../controllers/Profile.js";
import { validateSession } from "../middlewares/sessionAuth.js";

const router = express.Router();

router.post("/profile/", validateSession, ProfileController.fetchProfile);
router.patch("/profile/update/:userId", ProfileController.updateProfile);

export default router;
