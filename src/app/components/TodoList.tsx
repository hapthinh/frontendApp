'use client'

import { RootState, useAppDispatch, useAppSelector } from "app/lib/store"
import { getTodo, getTodoById } from "app/lib/api"
import { useQuery  } from "@tanstack/react-query"

export default function TodoList(){
    const query = useQuery({queryKey: ['todos'], queryFn: getTodo})

    if (!query.data) return <div>Loading...</div>;
    console.log(query.data);
    return(
        <div className="mr-50 ml-50">
            <table className="table-fixed border-1 w-full">
                <thead className="border-1">
                    <th>Todo</th>
                    <th>Status</th>
                </thead>
                <tbody >
                    {query.data.todos.todos.map((todo: any) => (
                    <tr key={todo.id} className="border-1">
                        <td >
                            {todo.todo}
                        </td>
                        <td className="text-center">
                            {todo.completed ? "done": "processing"}
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}