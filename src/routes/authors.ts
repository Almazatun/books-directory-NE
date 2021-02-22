import express from "express";
import controller from '../controllers/authors_controller'


const router = express.Router();

//Get all authors
router.get("/", controller.getAllAuthors)

//Create new author
router.post("/new", controller.createNewAuthor)

//Delete Author
router.delete("/delete/:id", controller.deleteAuthor)

export default router;
