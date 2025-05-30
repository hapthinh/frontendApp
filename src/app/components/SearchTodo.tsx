'use client'

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getTodo, getTodosByKw } from "app/lib/api"
import { useState } from "react"

export default function SearchTodo(){
    const [input, setInput] = useState("")

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationKey: ['todos'],
        mutationFn: (kw: string) => getTodosByKw(kw),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['todos']})
        }
    })

    return (
        <div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tim theo tu khoa"
            >
            </input>
            <button onClick={() => {
                if(input.trim()){
                    mutation.mutate(input)
                    setInput("");
                }
            }}>
            Search
            </button>
        </div>
    )
}