import express from "express";
import controller from '../controllers/users_controller'
import {authMe} from "../hellpers/authMe";

const router = express.Router();

//users
// router.get('/',  controller.getUsers)

//Register
router.post('/register',  controller.registerUser)

//Log in
router.post("/login", controller.logInUser)

//Log out
router.delete("/logout", controller.logOutUser)

//Auth me
router.post("/authchecker", controller.authMeUser)

//Add book user books collection
router.put("/user/:id/addbook", authMe, controller.addBookUserCollection)

//Delete book user books collection
router.delete("/user/:id/deletebook/:bookId", authMe, controller.deleteBookUserCollection)

//Update userName
router.put("/user/:id/update", authMe, controller.updateUserName)


export default router;
