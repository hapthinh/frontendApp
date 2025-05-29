'use client'

import { useQuery } from "@tanstack/react-query";
import { getTodoById } from "app/lib/api";

export default function TodoDetailPage({ params }: { params: { id: string } }) {
  const todoId = Number(params.id);
 // const query = useQuery({queryKey: ['todos'], queryFn: getTodoById(todoId)})

}