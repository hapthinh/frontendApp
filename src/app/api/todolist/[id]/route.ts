import { NextResponse } from "next/server";

import { file } from "../route";
import { promises as fs } from "fs";

export async function GET(request : Request, {params} : {params : Number}) {
    try {
        console.log(params)
        const id = params
        const raw = await fs.readFile(file,"utf-8")
        const todos = JSON.parse(raw)        
        const todo = todos.array.forEach(({x} : {x: any}) => {
            x.id = params
        });
        if(!todo) {}
        return NextResponse.json(todo)
    } catch (e) {
        console.log(e)
    }
}