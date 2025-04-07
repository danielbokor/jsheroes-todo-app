"use client";

import { startTransition, useOptimistic } from "react";
import { addTodo, AddTodoState, toggleTodo } from "../actions";
import { Todo } from "../types";
import { AddNewTodo } from "./AddNewTodo";
import { TodoItem } from "./TodoItem";

type OptimisticTodoAction =
  | {
      type: "ADD_TODO";
      todo: Todo;
    }
  | {
      type: "DELETE_TODO";
      todo: Todo;
    }
  | {
      type: "TOGGLE_TODO";
      todo: Todo;
    };

export function OptimisticTodoList({ initialTodos }: { initialTodos: Todo[] }) {
  const [todos, setOptimisticTodos] = useOptimistic(
    initialTodos,
    (state, action: OptimisticTodoAction) => {
      switch (action.type) {
        case "ADD_TODO":
          return [...state, action.todo];
        case "DELETE_TODO":
          return state.filter((todo) => todo.id !== action.todo.id);
        case "TOGGLE_TODO":
          return state.map((todo) =>
            todo.id === action.todo.id
              ? { ...todo, completed: !todo.completed }
              : todo
          );
        default:
          return state;
      }
    }
  );

  const handleToggleTodo = async (todo: Todo) => {
    startTransition(() => {
      setOptimisticTodos({ type: "TOGGLE_TODO", todo });
    });

    try {
      await toggleTodo(todo);
    } catch (e) {
      console.error(e);
      startTransition(() => {
        setOptimisticTodos({ type: "TOGGLE_TODO", todo });
      });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAddTodo = async (_: any, data: FormData) => {
    const title = data.get("title") as string;

    const payload = {
      title,
      completed: false,
      id: crypto.randomUUID(),
    } as Todo;

    startTransition(() => {
      setOptimisticTodos({
        type: "ADD_TODO",
        todo: payload,
      });
    });

    try {
      return addTodo({} as AddTodoState, data);
    } catch (e) {
      console.error(e);

      startTransition(() => {
        setOptimisticTodos({ type: "DELETE_TODO", todo: payload });
      });

      return { error: { title: "Failed to add todo" } };
    }
  };

  return (
    <>
      <AddNewTodo onAddTodo={handleAddTodo} />
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onToggle={handleToggleTodo} />
        ))}
      </ul>
    </>
  );
}
