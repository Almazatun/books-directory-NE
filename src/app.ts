import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import indexRouter from "./routes/index";

//Create express app
const app = express();

//Config Object to Avoid Deprecation Warnings
const config = { useNewUrlParser: true, useUnifiedTopology: true };

//MongoDB
const MONGODB = process.env.MONGODB || "mongodb://localhost/somename";

console.log(MONGODB);

//Connection database
mongoose.connect(MONGODB, config);

//Store Connection Object
const db = mongoose.connection;

//Connection events
db.once("open", () => {
  console.log("Connected to MongoDB database...");
}).on("error", (err: string) => {
  console.log(err);
});

app.use(bodyParser.json());

//Routes
app.use("/", indexRouter);

//Cors
const HOST: string | number = process.env.HOST || "http://localhost:3000";
app.use(
  cors({
    credentials: true,
    origin: HOST,
  })
);

//Port
const PORT: string | number = process.env.PORT || 3000;

//Starting server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
