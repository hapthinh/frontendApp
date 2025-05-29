'use client'

import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addTodo } from "app/features/todos/TodoSlice";
import { postTodo } from "app/lib/api";
import { useAppDispatch} from "app/lib/store";
import React, { useState } from "react";

export default function AddTodo(){
    const [input, setInput] = useState("");
    const dispatch = useAppDispatch()

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationKey:['todos'],
        mutationFn: postTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['todos']})
        }
    })

    return (
        <div className="text-2x1 text-white mr-50 ml-50 mt-50">
            <div className=" bg-black basis-128 text-center font-bold "><p>TODOLIST!!!!!!!</p></div>
            <div className="flex items-stretch border-1 bg-white mt-2 mb-2 h-10">
            <input
                className="text-black rounded-xl border-1 w-300"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Viet todo moi"
            />
            <button className="text-center bg-white text-indigo-600 hover:bg-indigo-600 hover:text-white m-2 border-1 rounded-full font-bold w-50 h-6" onClick={() => {
                if (input.trim()) {
                    mutation.mutate({
                        id: Date.now(),
                        todo: input,
                    })
                    setInput("");
                }
            }}><p className="m-1">Them Todo</p></button>
            </div>
        </div>
    )
}