import express from "express";
import { addFavorite, getFavorites, deleteFavorite } from "../controllers/favoriteController.js";

const router = express.Router();
router.post("/", addFavorite);
router.get("/:userId", getFavorites);
router.delete("/:id", deleteFavorite);

export default router;
