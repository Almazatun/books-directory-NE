import express from "express";
import controller from '../controllers/authors_controller'
import {authMe} from "../hellpers/authMe";


const router = express.Router();

//Get all authors
router.get("/", controller.getAllAuthors)

//Create new author
router.post("/new", authMe, controller.createNewAuthor)

//Delete Author
router.delete("/delete/:id", authMe, controller.deleteAuthor)

export default router;
