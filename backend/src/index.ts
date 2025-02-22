import express from "express";
import dotenv from "dotenv";
import { connectDatabase, prisma } from "./db";

dotenv.config();

connectDatabase();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/todos", async (req, res) => {
  const todos = await prisma.todo.findMany();
  res.json(todos);
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
