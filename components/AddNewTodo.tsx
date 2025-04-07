"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { AddTodoState } from "../actions";

export function AddNewTodo({
  onAddTodo,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onAddTodo: (_: any, data: FormData) => Promise<AddTodoState>;
}) {
  const [state, formAction] = useActionState(onAddTodo, {});

  return (
    <form className="flex flex-col gap-2 mb-4" action={formAction}>
      <div className="space-y-2">
        <label htmlFor="title" className="block text-sm font-medium">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Add new Todo"
          defaultValue={state?.title}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
            state?.error?.title ? "border-red-500" : "border-gray-300"
          }`}
        />
        {state?.error?.title && (
          <p className="text-red-500">{state.error.title}</p>
        )}
      </div>
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending, data, method, action } = useFormStatus();

  console.log(pending, data, method, action);

  return (
    <button
      type="submit"
      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
    >
      {pending ? "Submitting..." : "Add Todo"}
    </button>
  );
}
