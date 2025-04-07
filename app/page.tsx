import { AddNewTodo } from "@/components/AddNewTodo";
import { TodoList, TodoListSkeleton } from "@/components/TodoList";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="container mx-auto max-w-md">
      <h1 className="text-2xl font-bold mb-4">Todos:</h1>
      <AddNewTodo />
      <Suspense fallback={<TodoListSkeleton />}>
        <TodoList />
      </Suspense>
    </main>
  );
}
