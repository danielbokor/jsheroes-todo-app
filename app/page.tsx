import { TodoList } from "../components/TodoList";

export default function Home() {
  return (
    <main className="container mx-auto max-w-md">
      <h1 className="text-2xl font-bold mb-4">Todos:</h1>
      <TodoList />
    </main>
  );
}
