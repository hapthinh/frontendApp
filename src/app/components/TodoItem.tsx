'use client'

import { useQuery } from "@tanstack/react-query"
import { getTodoById } from "app/lib/api"

export default function TodoItem({todoId}: {todoId : Number}){
    const query = useQuery({queryKey: ['todos',todoId], queryFn:() => getTodoById(todoId)})

    return (
        <div>
            {query.data}
        </div>
    )
}