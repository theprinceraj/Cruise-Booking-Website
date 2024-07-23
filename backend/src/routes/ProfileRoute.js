import express from "express";
import * as ProfileController from "../controllers/Profile.js";

const router = express.Router();

router.post("/profile/:userId", ProfileController.createProfile);
router.patch("/profile/update/:userId", ProfileController.updateProfile);

export default router;
