'use client'

import { getTodo } from "app/lib/api"
import { useMutation, useQuery, useQueryClient  } from "@tanstack/react-query"
import Link from "next/link"
import { deteleTodo, ChangeType } from "app/lib/api"

export default function TodoList(){
    const query = useQuery({queryKey: ['todos'], queryFn: getTodo})

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationKey: ['todos'],
        mutationFn: deteleTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['todos']})
        },
        onError: () => {
            console.log("failed")
        }
    })

    const mutation1 = useMutation({
        mutationKey: ['todos'],
        mutationFn: ChangeType,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['todos']})
        },
        onError: () => {
            console.log("failed")
        },
    })

    if (!query.data) return <div>Loading...</div>;
    console.log(query.data);
    return(
        <div className="mr-50 ml-50 mt-5">
            <div className=" bg-black basis-128 text-center font-bold "><p>THAO TAC TODOLIST!!!!!!!</p></div>
            <table className="table-auto border-1 w-full text-black bg-white">
                <thead className="border-1">
                    <tr>
                    <th>Todo</th>
                    <th>Status</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody >
                    {query.data.todos?.map((todo: any) => (
                    <tr key={todo.id} className="border-1">
                        <td className="text-center">
                            <Link href={`/todo/${todo.id}`}>{todo.todo}</Link>
                        </td>
                        <td className="text-center">
                            {todo.completed ? "done": "processing"}
                        </td>
                        <td className="w-50 h-6 flex flex-row">
                            <div className="basic-64 ">
                            <button className="ml-90 basic-64 text-center  text-indigo-600 hover:bg-indigo-600 hover:text-white border-1 rounded-full font-bold" onClick={() => mutation.mutate({
                                id : todo.id
                            })}>Xoa?</button>
                            </div>
                            <div className="basic-64 ml-10">
                            <button className="basic-64 text-center text-indi  go-600 hover:bg-indigo-600 hover:text-white border-1 rounded-full font-bold" onClick={() => mutation1.mutate({
                                id : todo.id,
                                completed : !todo.completed
                            })}>completed?</button>
                            </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}