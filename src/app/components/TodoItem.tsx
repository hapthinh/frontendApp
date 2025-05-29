'use client'

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getTodosByType, getTodo } from "app/lib/api";

export default function TodoItem(){

    const query = useQuery({queryKey: ['todos'], queryFn: () => getTodo()})

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationKey: ['todos'],
        mutationFn: getTodosByType,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['todos']})
        }
    })

    return (
        <div>
            <div className="flex flex-row">
                <div>
                    <span>Completed</span>
                    {query.data?.todos?.todos?.map((todo : any) => (
                        <ul>
                            <li key={todo.completed && todo.completed == true}>{todo.todo}</li>
                        </ul>
                    ))}
                </div>
                <div>
                    <span>Processing</span>
                    {query.data?.todos?.todos?.map((todo : any) => (
                        <ul>
                            <li key={todo.completed && todo.completed == false}>{todo.todo}</li>
                        </ul>
                    ))}
                </div>
            </div>
        </div>
    )
}