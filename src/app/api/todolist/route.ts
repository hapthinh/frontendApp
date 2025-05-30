import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

//path file json -> app/json/todolist.json
export const file = path.join(process.cwd() + "/src/app/json/todolist.json")

// Route CRUD todolist
export async function GET(request: Request) {
    const {searchParams} = new URL(request.url)
    const kw = searchParams.get("kw") || "";
    const raw = await fs.readFile(file,"utf-8")
    const data = JSON.parse(raw)

    let todos = data.todos
    if(kw){
        todos = todos.filter((todo: any) => 
            String(todo.todo).toLowerCase().includes(kw.toLowerCase()))
    }
    return NextResponse.json({ todos });
}

export async function POST(request: Request) {
    const raw = await fs.readFile(file,"utf-8")
    const body = await request.json();
    const data = JSON.parse(raw);
    const newTodo = { ...body, completed: false };
    data.todos.push(newTodo);
    await fs.writeFile(file, JSON.stringify(data, null, 2), "utf-8");
    return NextResponse.json(newTodo);
}

export async function DELETE(request: Request) {
    const raw = await fs.readFile(file,"utf-8")
    const body = await request.json();
    const id = body.id
    const data = JSON.parse(raw)
    data.todos = data.todos.filter((todo: any) => todo.id !== id)
    await fs.writeFile(file, JSON.stringify(data, null, 2), "utf-8");
    return NextResponse.json({success : true})
}
