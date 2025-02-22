import express from "express";
import dotenv from "dotenv";
import { connectDatabase } from "./db";

dotenv.config();

connectDatabase();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
