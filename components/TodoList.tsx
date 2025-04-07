import { Todo } from "../types";
import { TodoItem } from "./TodoItem";

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchTodos(): Promise<Todo[]> {
  await delay(1000);

  const response = await fetch(
    "https://67a79752203008941f68094b.mockapi.io/todos",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.json();
}

export async function TodoList() {
  const todos = await fetchTodos();

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

export function TodoListSkeleton() {
  return (
    <ul>
      {[...Array(5)].map((_, index) => (
        <li key={index} className="flex items-center gap-2 p-2">
          <div className="w-4 h-4 bg-gray-300 rounded-full animate-pulse"></div>
          <div className="w-full h-4 bg-gray-300 rounded-full animate-pulse"></div>
        </li>
      ))}
    </ul>
  );
}
