import express from "express";

import uploadBookImage from "../middlewares/bookUploadMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { addBook, deleteBook, getBooks, getUserBooks } from "../controllers/book.controller.js";


const router = express.Router();

// router.post("/", authMiddleware, uploadBookImage.single("image"), addBook);
router.post("/", authMiddleware, addBook);
router.get("/", authMiddleware, getBooks);
router.get("/user", authMiddleware, getUserBooks);
router.delete("/:id", authMiddleware, deleteBook);

export default router;