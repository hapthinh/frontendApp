'use client'

import { QueryClientProvider, QueryClient, useQueryClient } from "@tanstack/react-query";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import Providers from "./provider/provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function App(){
  const queryClient = new QueryClient();
  return (
  <Providers>
    <QueryClientProvider client={queryClient}>
      <AddTodo />
      <TodoList />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </Providers>
  )
}