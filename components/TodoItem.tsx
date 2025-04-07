"use client";

import { Todo } from "@/types";
import { useId, useTransition } from "react";

export function TodoItem({
  todo,
  onToggle,
}: {
  todo: Todo;
  onToggle: (todo: Todo) => Promise<void>;
}) {
  const htmlId = useId();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      await onToggle(todo);
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
