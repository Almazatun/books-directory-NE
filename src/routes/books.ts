import express from "express";
import controller from '../controllers/books_controller'

const router = express.Router();

//Get all books
router.get("/", controller.getAllBooks)

//Create new book
router.post("/new", controller.createNewBook)

//Delete book
router.delete("/delete/:id", controller.deleteBook)

export default router;
