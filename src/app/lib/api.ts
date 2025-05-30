//file API TODOLIST {GET, POST, DELETE, PATCH} CRUD

import { Todo } from "app/api/todolist/route";
import { Key } from "react";

// Domain API
const API = 'http://localhost:3000/api/todolist'

// API GET TODO
export async function getTodo() {
    const res = await fetch(API, { cache: "no-store" });
    return res.json();
}

// API POST TODO
export async function postTodo({id, todo}: {id: Key | null | undefined, todo: string}) {
    const res = await fetch (API, {
        method : 'POST',
        headers : { 'Content-type': 'application/json'},
        body : JSON.stringify({
            id : id, 
            todo : todo
        })
    })
    return res.json()
}

// API DELETE TODO
export async function deteleTodo({id}: {id : Key | null | undefined}) {
    const res = await fetch(`${API}/${id}`,{
        method: 'DELETE'
    })
    return res.json()
}

// API CHANGE STATUS
export async function updateTodoStatus({id, status}: {id: Key | null | undefined, status: boolean}) {
    const res = await fetch(`${API}/${id}`,{
        method: 'PATCH',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
            id,status
        })
    }, )
    return res.json()
}


// API GET TODO BY KW
export async function getTodosByKw(kw : String) {
    const res = await fetch(`${API}?kw=${kw}`,{
        cache: 'no-store'
    })
    return res.json()
}

// API GET TODO BY STATUS
export async function getTodosByType(status : string) {
    const res = await fetch(`${API}?status=${status}`,{
        cache: 'no-store'
    })
    return res.json()
}


// API GET TODO BY ID
export async function getTodoById({id}: {id: Key}) {
    const res = await fetch(`http://localhost:3000/api/todolist/${id}`, { cache: "no-store" });
    return res.json(); 
}


