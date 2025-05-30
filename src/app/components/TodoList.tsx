"use client";

import { CheckSquare, X } from "@deemlol/next-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

import { deteleTodo, getTodo, updateTodoStatus } from "app/lib/api";
import { Todo } from "app/api/todolist/route";

export default function TodoList() {
  const query = useQuery({ queryKey: ["todos"], queryFn: getTodo });
  const queryClient = useQueryClient();

  const deleteTodoMutation = useMutation({
    mutationKey: ["todos"],
    mutationFn: deteleTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: () => {
      console.log("failed");
    },
  });

  const updateTodoMutation = useMutation({
    mutationKey: ["todos"],
    mutationFn: updateTodoStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: () => {
      console.log("failed");
    },
  });

  console.log(query.data);

  const renderActions = (todo: Todo) => {
    return (
      <>
        <div className="basic-64 ">
          <button
            className="ml-90 basic-64 text-center text-red-600 hover:bg-red-500 hover:text-white border-1 rounded-full font-bold w-15"
            onClick={() => deleteTodoMutation.mutate({ id: todo.id })}
          >
            Delete
          </button>
        </div>
        <div className="basic-64 ml-10">
          <button
            className="basic-64 text-center text-lime-600 hover:bg-lime-400 hover:text-white border-1 rounded-full font-bold w-25"
            onClick={() =>
              updateTodoMutation.mutate({
                id: todo.id,
                status: !todo.status,
              })
            }
          >
            Completed
          </button>
        </div>
      </>
    );
  };

  // Rendering
  if (!query.data) return <div>Loading...</div>;

  return (
    <div className="mr-50 ml-50 mt-5">
      {/* Header */}
      <div className=" bg-black basis-128 text-center font-bold text-white">
        <p>TODOLIST INTERACTION !!!!!!!</p>
      </div>

      <table className="table-auto border-1 w-full text-black bg-white">
        {/* Table header */}
        <thead className="border-1">
          <tr>
            <th>Todo</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        {/* Table content */}
        <tbody>
            {(Array.isArray(query.data?.todos.todos) ? query.data.todos.todos : []).map((todo: Todo) => (
            <tr key={todo.id} className="border-1 h-9">
              <td className="text-center">
                <Link href={`/todo/${todo.id}`}>{todo.todo}</Link>
              </td>

              {/* Description */}
              <td className="content-center">
                {todo.status ? (
                  <>
                    <CheckSquare className="text-green-600" />
                    Done
                  </>
                ) : (
                  <>
                    <X className="text-red-600" />
                    Pending
                  </>
                )}
              </td>

              {/* Actions */}
              <td className="w-50 h-6 flex flex-row mt-1">
                {renderActions(todo)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
