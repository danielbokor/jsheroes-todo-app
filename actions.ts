"use server";

import { revalidatePath } from "next/cache";
import { Todo } from "./types";

export async function toggleTodo(todo: Todo) {
  const response = await fetch(
    `https://67a79752203008941f68094b.mockapi.io/todos/${todo.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...todo,
        completed: !todo.completed,
      }),
    }
  );

  revalidatePath("/");

  return response.json();
}

export async function addTodo(data: FormData) {
  const title = data.get("title") as string;

  if (!title) {
    throw new Error("Title is required");
  }

  const response = await fetch(
    "https://67a79752203008941f68094b.mockapi.io/todos",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, completed: false }),
    }
  );

  revalidatePath("/");

  return response.json();
}
