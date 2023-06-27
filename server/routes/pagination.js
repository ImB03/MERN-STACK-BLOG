import express from "express";

import { getPostsByPagination } from "../controllers/pagination.js";

const router = express.Router();

router.get("/", getPostsByPagination);

export default router;
