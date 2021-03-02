import express from "express";
import controller from '../controllers/books_controller'
import {authMe} from "../hellpers/authMe";

const router = express.Router();

//Get all books
router.get("/", controller.getAllBooks)

//Create new book
router.post("/new", authMe, controller.createNewBook)

//Delete book
router.delete("/delete/:id", authMe, controller.deleteBook)

export default router;
