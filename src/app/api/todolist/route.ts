import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

import { Key } from "react";

// Path file json -> app/json/todolist.json
export const file = path.join(process.cwd() + "/src/app/json/todolist.json");

//Type of Todo
export type Todo = {
  id: Key | null | undefined;
  todo: string;
  status: boolean;
};

// Type of Todos
export type Todos = {
  todos: Todo[];
};

// Get all todos or todo by keyword or tody by completed
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get("kw") || "";
  const status = searchParams.get("status") || "";
  const raw = await fs.readFile(file, "utf-8");
  const data = JSON.parse(raw) as Todos;

  let todos : any = data;

  // Filter by keyword
  if (keyword) {
    todos.todos = todos.todos.filter((todo: Todo) => {
        String(todo.todo).toLowerCase().includes(keyword.toLowerCase())
    })
  }

  // Filter by status
  if (status) {
    todos.todos = todos.todos.filter((todo: Todo) => String(todo.status) === status);
  }

  return NextResponse.json({ todos });
}

// Post new Todo
export async function POST(request: Request) {
  const raw = await fs.readFile(file, "utf-8");
  const body = await request.json();
  const data = JSON.parse(raw);
  const newTodo = { ...body, completed: false };

  data.todos.push(newTodo);

  await fs.writeFile(file, JSON.stringify(data, null, 2), "utf-8");

  return NextResponse.json(newTodo);
}

// Delete Todo by Id
export async function DELETE(request: Request) {
  const raw = await fs.readFile(file, "utf-8");
  const body = await request.json();
  const data = JSON.parse(raw);
  const id = body.id;

  data.todos = data.todos.filter((todo: Todo) => todo.id !== id);

  await fs.writeFile(file, JSON.stringify(data, null, 2), "utf-8");

  return NextResponse.json({ success: true });
}
