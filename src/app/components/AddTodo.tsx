'use client'

import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTodosByKw, postTodo } from "app/lib/api";
import { useAppDispatch} from "app/lib/store";
import React, { useState } from "react";
import Link from "next/link";

export default function AddTodo(){
    const [input, setInput] = useState("");

    const [inputSearch, setInputSearch] = useState("")

    const query = useQuery({queryKey: ['todos', inputSearch], queryFn: () => getTodosByKw(inputSearch)})

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationKey:['todos'],
        mutationFn: postTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['todos']})
        }
    })

    const mutationSearch = useMutation({
        mutationKey: ['todos'],
        mutationFn: (kw : string) => getTodosByKw(kw),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['todos']})
        }
    })

    return (
        <div className="text-2x1 text-white mr-50 ml-50 mt-30">
            <div className=" bg-black basis-128 text-center font-bold "><p>TODOLIST!!!!!!!</p></div>
            <div className="flex items-stretch border-1 bg-white mt-2 mb-2 h-10 flex flex-row">
                <div>
                    <input
                        className="text-black rounded-lg border border-indigo-400 focus:ring-2 focus:ring-indigo-500 px-4 py-2 w-56 outline-none transition ml-50 w-100"
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Viet todo moi"
                    />
                    <button 
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-indigo-700 transition ml-2 h-11"
                        onClick={() => {
                        if (input.trim()) {
                            mutation.mutate({
                                id: Date.now(),
                                todo: input,
                            })
                            setInput("");
                        }
                    }}><p className="m-1">Them Todo</p></button>
                </div>
                <div>
                    <input
                        className="text-black rounded-lg border border-indigo-400 focus:ring-2 focus:ring-indigo-500 px-4 py-2 w-56 outline-none transition ml-10 w-100"
                        type="text"
                        value={inputSearch}
                        onChange={(e) => setInputSearch(e.target.value)}
                        placeholder="tim theo kw"
                    />
                    <button
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-indigo-700 transition ml-2 h-11"
                        onClick={() => {
                        if(inputSearch.trim()){
                            mutationSearch.mutate(inputSearch)
                            setInputSearch("");
                        }
                    }}>Tim</button>
                </div>
            </div>
            <div>
            <div className="mr-50 ml-50">
                <table className="table-auto border-1 w-full text-black bg-white">
                    <thead className="border-1">
                        <tr>
                        <th>Todo</th>
                        <th>Status</th>
                        </tr>
                    </thead>
                    <tbody >
                        {query.data?.todos?.map((todo: any) => (
                        <tr key={todo.id} className="border-1">
                            <td className="text-center">
                                <Link href={`/todo/${todo.id}`}>{todo.todo}</Link>
                            </td>
                            <td className="text-center">
                                {todo.completed ? "done": "processing"}
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </div>
        </div>
    )
}