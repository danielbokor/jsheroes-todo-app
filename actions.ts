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
