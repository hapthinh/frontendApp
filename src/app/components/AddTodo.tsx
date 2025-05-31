"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import Link from "next/link";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";

import { getTodosByKw, getTodosByType, postTodo } from "app/lib/api";
import { Todo } from "app/api/todolist/route";
import { todo } from "node:test";

export default function AddTodo() {
  const [input, setInput] = useState("");
  const [inputSearch, setInputSearch] = useState("");
  const [selectStatus, setSelectStatus] = useState("");

  const queryKeyword = useQuery({
    queryKey: ["todos", inputSearch],
    queryFn: () => getTodosByKw(inputSearch),
  });
  const queryStatus = useQuery({
    queryKey: ["todos", selectStatus],
    queryFn: () => getTodosByType(selectStatus),
  });

  const queryClient = useQueryClient();

  console.log(queryStatus.data);

  const postTodoMutation = useMutation({
    mutationKey: ["todos"],
    mutationFn: postTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  const searchTodoMutation = useMutation({
    mutationKey: ["todos"],
    mutationFn: (kw: string) => getTodosByKw(kw),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return (
    <div className="text-2x1 text-white mr-50 ml-50 mt-30">
      <div className=" bg-black basis-128 text-center font-bold ">
        <p>TODOLIST!!!!!!!</p>
      </div>
      <div className="flex items-stretch border-1 bg-white mt-2 mb-2 h-10 flex-row">
        <div>
          <input
            className="text-black rounded-lg border border-indigo-400 focus:ring-2 focus:ring-indigo-500 px-4 py-2 outline-none transition ml-50 w-56 h-9"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter New Todo"
          />
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-indigo-700 transition ml-2 h-10"
            onClick={() => {
              if (input.trim()) {
                postTodoMutation.mutate({
                  id: Date.now(),
                  todo: input,
                });
                setInput("");
              }
            }}
          >
            <p className="">Add New ToDo</p>
          </button>
        </div>
        <div>
          <input
            className="text-black rounded-lg border border-indigo-400 focus:ring-2 focus:ring-indigo-500 px-4 py-2 outline-none transition ml-10 w-56"
            type="text"
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
            placeholder="Enter Keyword"
          />
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-indigo-700 transition ml-2 h-11"
            onClick={() => {
              if (inputSearch.trim()) {
                searchTodoMutation.mutate(inputSearch);
                setInputSearch("");
              }
            }}
          >
            Search
          </button>
        </div>
        <div className="bg-stone-200 text-black ml-2 h-6">
          <Combobox
            value={selectStatus}
            onChange={(value) => setSelectStatus(value ?? "true")}
          >
            <ComboboxInput
              displayValue={() =>
                selectStatus === "true" ? "Done" : "Pending"
              }
            />
            <ComboboxOptions className="border-indigo-400 text-black font-semibold bg-stone-300">
              <ComboboxOption value="true" className="data-focus:bg-blue-100">
                Done
              </ComboboxOption>
              <ComboboxOption value="false" className="data-focus:bg-blue-100">
                Pending
              </ComboboxOption>
            </ComboboxOptions>
          </Combobox>
        </div>
      </div>
      <div>
        <div>
              <div className="mr-50 ml-50">
                <table className="table-auto border-1 w-full text-black bg-white">
                  <thead className="border-1">
                    <tr>
                      <th>Todo</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(Array.isArray(queryKeyword.data?.todos.todos) ? queryKeyword.data.todos.todos : []).map((todo: Todo) => (
                      <tr key={todo.id} className="border-1">
                        <td className="text-center">
                          <Link href={`/todo/${todo.id}`}>{todo.todo}</Link>
                        </td>
                        <td className="content-center ">
                          {todo.status ? "Done" : "Pending"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div>
                <h2 className="font-bold mt-4 mb-2 text-black mr-50 ml-50">
                  Danh sách Todo:
                </h2>
                <div className="space-y-2">
                  {(Array.isArray(queryStatus.data?.todos.todos)
                    ? queryStatus.data.todos.todos
                    : []
                  ).map((todo: Todo) => (
                    <div
                      key={todo.id}
                      className="p-2 border rounded bg-white text-black"
                    >
                      <span className="font-semibold">{todo.todo}</span>
                      <span className="ml-4">
                        {todo.status ? "Done" : "Pending"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
        </div>
      </div>
    </div>
  );
}
