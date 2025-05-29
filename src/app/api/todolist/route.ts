import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const file = path.join(process.cwd() + "/src/app/json/todolist.json")

export async function GET() {
    const raw = await fs.readFile(file,"utf-8")
    const todos = JSON.parse(raw)
    console.log(raw)
  return NextResponse.json({ todos });
}

export async function POST(request: Request) {
    const body = await request.json();
    const raw = await fs.readFile(file, "utf-8");
    const data = JSON.parse(raw);
    const newTodo = { ...body, completed: false };
    data.todos.push(newTodo);
    await fs.writeFile(file, JSON.stringify(data, null, 2), "utf-8");
    return NextResponse.json(newTodo);
}

export async function DELETE() {
  
}