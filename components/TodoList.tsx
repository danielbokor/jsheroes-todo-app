type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

async function fetchTodos(): Promise<Todo[]> {
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
        <li key={todo.id}>
          <input
            type="checkbox"
            id={todo.id}
            checked={todo.completed}
            readOnly
          />
          {todo.title}
        </li>
      ))}
    </ul>
  );
}
