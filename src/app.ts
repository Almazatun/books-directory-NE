import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import IndexRouter from "./routes/index";
import Authors from "./routes/authors";
import Books from "./routes/books";
import Images from "./routes/images";
import {DB_HOST} from "./config/database";
import {CORS_ALLOW_HOST, CORS_WITH_CREDENTIALS} from "./config/cors";
import {PORT} from "./config";

//Create express app
const app = express();
app.use('/public' ,express.static('public'))

//Config Object to Avoid Deprecation Warnings
const config = { useNewUrlParser: true, useUnifiedTopology: true };

//MongoDB
//Connection database
mongoose.connect(DB_HOST, config);

//Store Connection Object
const db = mongoose.connection;

//Connection events
db.once("open", () => {
  console.log("Connected to MongoDB database...");
}).on("error", (err: string) => {
  console.log(err);
});

//BodyParser
app.use(bodyParser.json());

//Cors
app.use(
  cors({
    credentials: CORS_WITH_CREDENTIALS,
    origin: CORS_ALLOW_HOST,
  })
);

//Routes
app.use("/", IndexRouter);
app.use("/authors", Authors);
app.use("/books", Books);


//Starting server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
