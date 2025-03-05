import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDatabase, prisma } from "./db";

import { add, sub, mul, div } from "@repo/utils/math";

dotenv.config();

connectDatabase();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  console.log(add(1, 2));
  console.log(sub(1, 2));
  console.log(mul(1, 2));
  console.log(div(1, 2));

  res.send("Hello World!");
});

app.get("/hello", (_, res) => {
  res.send("Hello!");
});

app.get("/hello/:name", (req, res) => {
  const name = req.params.name;
  res.send(`Hello, ${name}!`);
});

app.get("/todos", async (_req, res) => {
  const todos = await prisma.todo.findMany();
  res.json(todos);
});

app.post("/todos", async (req, res) => {
  const { title } = req.body;
  const todo = await prisma.todo.create({
    data: {
      title,
    },
  });
  res.json(todo);
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
