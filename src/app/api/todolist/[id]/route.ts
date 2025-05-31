import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// path file json -> app/json/todolist.json
export const file = path.join(process.cwd() + "/src/app/json/todolist.json")

// delete todo by id
export async function DELETE(request: Request) {
    const url = new URL(request.url)
    const id = url.pathname.split("/").pop()
    const raw = await fs.readFile(file, "utf-8")
    const data = JSON.parse(raw);

    if (!id) return NextResponse.json({ success: false, error: "Missing id" })

    data.todos = data.todos.filter((todo: any) => Number(todo.id) !== Number(id));

    await fs.writeFile(file, JSON.stringify(data, null, 2), "utf-8");

    return NextResponse.json({ success: true });
}

// change status todo by id
export async function PATCH(request: Request) {
    const body = await request.json()
    const raw = await fs.readFile(file, "utf-8")
    const { id, status } = body
    const data = JSON.parse(raw);

    data.todos = data.todos.map((todo: any) => todo.id === id ? { ...todo, status } : todo)

    await fs.writeFile(file, JSON.stringify(data, null, 2), "utf-8")

    return NextResponse.json({ data })
}

// get todo by id
export async function GET(request: Request) {
    const body = await request.json()
    const raw = await fs.readFile(file, 'utf-8')
    const id = body
    const data = JSON.parse(raw);

    data.todos = data.todos.filter((todo: any) => todo.id === id)
    
    return NextResponse.json(data.todos)
}