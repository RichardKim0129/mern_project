import express from "express";
const router = express.Router();

import { signin, signup } from "../controllers/user.js";

// Post because we need to send the data to the backend to the user database
router.post("/signin", signin);
router.post("/signup", signup);

export default router;
