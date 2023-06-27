import express from "express";

import { signup, signin } from "../controllers/auth.js";

const router = express.Router();

// router.post("/googleauth", googleauth);
router.post("/signup", signup);
router.post("/signin", signin);

export default router;
