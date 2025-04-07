"use client";

import { Todo } from "@/types";
import { useId, useTransition } from "react";
import { toggleTodo } from "../actions";

export function TodoItem({ todo }: { todo: Todo }) {
  const htmlId = useId();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      await toggleTodo(todo);
    });
  };

  return (
    <li className="flex items-center gap-2 p-2">
      <input
        type="checkbox"
        id={htmlId}
        checked={todo.completed}
        onChange={handleToggle}
        className="cursor-pointer"
      />
      <label
        htmlFor={htmlId}
        className={`cursor-pointer ${todo.completed ? "line-through" : ""}`}
      >
        {todo.title}
      </label>
    </li>
  );
}
