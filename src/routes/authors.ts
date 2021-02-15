import express, { Request, Response } from "express";

const router = express.Router();

//Get all authors
router.get("/", (req: Request, res: Response) => {
  res.send("all Authors");
});

//Create new author
router.post("/new", (req: Request, res: Response) => {
  res.send("New author");
});

export default router;
