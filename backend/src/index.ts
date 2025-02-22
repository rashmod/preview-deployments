import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDatabase, prisma } from "./db";

dotenv.config();

connectDatabase();

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/hello", (req, res) => {
  res.send("Hello!");
});

app.get("/hello/:name", (req, res) => {
  const name = req.params.name;
  res.send(`Hello, ${name}!`);
});

app.get("/todos", async (req, res) => {
  const todos = await prisma.todo.findMany();
  res.json(todos);
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
