import express from "express";

import { getPostsBySearch, getPostsByCreator } from "../controllers/search.js";

const router = express.Router();

router.get("/findbysearch", getPostsBySearch);
router.get("/findbycreator", getPostsByCreator);

export default router;
