import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let todos = []; // static array just for testing

// 📝 Get all todos
app.get("/api/todos", (req, res) => {
  res.json(todos);
});

// 🆕 Add todo
app.post("/api/addTodo", (req, res) => {
  const { text } = req.body;
  const newTodo = { id: Date.now(), text, completed: false };
  todos.push(newTodo);
  res.json(newTodo);
});

// ✅ Complete todo
app.put("/api/completeTodo", (req, res) => {
  const { id } = req.body;
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: true } : todo
  );
  res.json({ success: true });
});

// ▶ Listen
app.listen(3000, () => console.log("🚀 Backend running on http://localhost:3000"));
