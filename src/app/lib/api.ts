//file API TODOLIST {GET, POST, DELETE, PATCH} CRUD

const API = 'http://localhost:3000/api/todolist'

export async function getTodo() {
    const res = await fetch(API, { cache: "no-store" });
    return res.json();
}

export async function postTodo({id, todo}: {id: any, todo: any}): Promise<any> {
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

export async function deteleTodo({id}: {id : Number}) {
    const res = await fetch(`${API}/${id}`,{
        method: 'DELETE'
    })
    return res.json()
}

export async function ChangeType({id, completed}: {id: Number, completed: boolean}) {
    const res = await fetch(`${API}/${id}`,{
        method: 'PATCH',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
            id,completed
        })
    }, )
    return res.json()
}


export async function getTodosByKw(kw : String) {
    const res = await fetch(`${API}?kw=${kw}`,{
        cache: 'no-store'
    })
    return res.json()
}


export async function getTodoById({id}: {id: Number}) {
    const res = await fetch(`http://localhost:3000/api/todolist/${id}`, { cache: "no-store" });
    return res.json(); 
}


