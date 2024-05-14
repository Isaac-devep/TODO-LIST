import express from "express";
import cors from "cors";
import {
  getTodo,
  shareTodo,
  deleteTodo,
  getTodosByID,
  createTodo,
  updateTodo,
  getUserByEmail,
  getUserByID,
  getSharedTodoByID,
} from "./src/config/database.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/todos/:id", async (req, res) => {
  const todos = await getTodosByID(req.params.id);
  res.status(200).send(todos);
});

app.get("/todos/shared_todos/:id", async (req, res) => {
  const todo = await getSharedTodoByID(req.params.id);
  const author = await getUserByID(todo.user_id);
  const shared_with = await getUserByID(todo.shared_with_id);
  res.status(200).send({ author, shared_with });
});

app.get("/users/:id", async (req, res) => {
  const user = await getUserByID(req.params.id);
  res.status(200).send(user);
});

app.put("/todos/:id", async (req, res) => {
  const { title, details, completed } = req.body;
  console.log(`Updating todo ${req.params.id} with data:`, { title, details, completed });
  if (typeof completed !== 'boolean') {
    return res.status(400).send({ message: "Invalid value for completed" });
  }
  try {
    const todo = await updateTodo(req.params.id, { title, details, completed });
    res.status(200).send(todo);
  } catch (error) {
    console.error('Failed to update todo:', error);
    res.status(500).send({ message: "Failed to update todo" });
  }
});

app.delete("/todos/:id", async (req, res) => {
  console.log(`Attempting to delete todo with id ${req.params.id}`);
  try {
    await deleteTodo(req.params.id);
    console.log('Todo deleted successfully');
    res.send({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error('Failed to delete todo:', error);
    res.status(500).send({ message: "Failed to delete todo" });
  }
});

app.post("/todos", async (req, res) => {
  const { user_id, title } = req.body;
  if (!user_id || typeof user_id !== 'number') {
    return res.status(400).send({ message: "Invalid or missing user_id" });
  }
  try {
    const todo = await createTodo(user_id, title);
    res.status(201).send(todo);
  } catch (error) {
    console.error('Failed to create todo:', error);
    res.status(500).send({ message: "Failed to create todo" });
  }
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});