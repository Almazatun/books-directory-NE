import express from "express";
import controller from '../controllers/books'

const router = express.Router();

//Get all authors
router.get("/", controller.getAllBooks)

//Create new author
router.post("/new", controller.createNewBook)

export default router;
