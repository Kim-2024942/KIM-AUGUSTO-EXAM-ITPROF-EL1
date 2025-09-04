import { getTodos, completeTodo } from "../../api/todoApi";
import JSConfetti from "js-confetti";
import "./todoList.css";

const jsConfetti = new JSConfetti();

export async function renderTodoList() {
  const container = document.createElement("div");
  container.className = "todo-list";

  const todos = await getTodos();

  container.innerHTML = `
    <table border="1" cellpadding="8">
      <tr>
        <th>Todo</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
      ${todos
        .map(
          (t) => `
        <tr>
          <td>${t.text}</td>
          <td>${t.completed ? "✅ Done" : "❌ Pending"}</td>
          <td>
            ${
              !t.completed
                ? `<button data-id="${t.id}">Complete</button>`
                : ""
            }
          </td>
        </tr>
      `
        )
        .join("")}
    </table>
  `;

  container.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", async () => {
      await completeTodo(Number(btn.dataset.id));

     
      jsConfetti.addConfetti();
        
    
      const event = new Event("todosUpdated");
      document.dispatchEvent(event);
    });
  });

  return container;
}
