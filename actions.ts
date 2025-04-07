"use server";

import { revalidatePath } from "next/cache";
import { Todo } from "./types";

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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

export type AddTodoState = {
  error?: { title?: string };
  title?: string;
};

export async function addTodo(
  prevState: AddTodoState,
  data: FormData
): Promise<AddTodoState> {
  const title = data.get("title") as string;

  if (!title) {
    return {
      ...prevState,
      error: { ...prevState.error, title: "Title is required" },
    };
  }

  if (title.length < 5) {
    await delay(2000);

    return {
      ...prevState,
      error: {
        ...prevState.error,
        title: "Title must be at least 5 characters",
      },
      title,
    };
  }

  await fetch("https://67a79752203008941f68094b.mockapi.io/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, completed: false }),
  });

  revalidatePath("/");

  return {};
}
