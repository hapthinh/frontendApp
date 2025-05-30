'use client'

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getTodosByKw, getTodo } from "app/lib/api";

export default function TodoItem(){

    const query = useQuery({queryKey: ['todos'], queryFn: () => getTodo()})

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationKey: ['todos'],
        mutationFn: getTodosByKw,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['todos']})
        }
    })
}