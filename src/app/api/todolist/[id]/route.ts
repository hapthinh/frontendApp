import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

//path file json -> app/json/todolist.json
export const file = path.join(process.cwd() + "/src/app/json/todolist.json")

export async function DELETE({ params }: { params: { id: string } }) {
    const id = Number(params.id);
    const raw = await fs.readFile(file,"utf-8")
    const data = JSON.parse(raw);
    data.todos = data.todos.filter((todo: any) => todo.id !== id);
    await fs.writeFile(file, JSON.stringify(data, null, 2), "utf-8");
    return NextResponse.json({ success: true });
}

// change completed status todo by id
export async function PATCH(request: Request) {
    const body = await request.json()
    const raw = await fs.readFile(file,"utf-8")
    const {id, completed} = body
    const data = JSON.parse(raw);
    data.todos = data.todos.map((todo: any) => todo.id === id ? {...todo, completed} : todo)
    await fs.writeFile(file, JSON.stringify(data,null,2), "utf-8")
    return NextResponse.json({data})
}

export async function GET(request: Request) {
    const body = await request.json()
    const raw = await fs.readFile(file,'utf-8')
    const id = body
    const data = JSON.parse(raw);
    data.todos = data.todos.filter((todo : any) => todo.id ===id )
    return NextResponse.json(data.todos)
}