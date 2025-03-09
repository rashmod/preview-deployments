import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

import { add, sub, mul, div } from "@repo/utils";
import { db } from "./db";
import { todoSchema } from "./db/schema";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  const x = Math.ceil(Math.random() * 10);
  const y = Math.ceil(Math.random() * 10);

  res.json({
    message: "Hello World!",
    x,
    y,
    add: add(x, y),
    sub: sub(x, y),
    mul: mul(x, y),
    div: div(x, y),
  });
});

app.get("/hello", (_, res) => {
  res.send("Hello!");
});

app.get("/hello/:name", (req, res) => {
  const name = req.params.name;
  res.send(`Hello, ${name}!`);
});

app.get("/todos", async (_req, res) => {
  const todos = await db.select().from(todoSchema);
  res.json(todos);
});

app.post("/todos", async (req, res) => {
  const { title } = req.body;

  const [todo] = await db.insert(todoSchema).values({ title }).returning();
  res.json(todo);
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
