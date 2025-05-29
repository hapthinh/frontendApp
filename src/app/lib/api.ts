

export async function getTodo(): Promise<any> {
    const res = await fetch('http://localhost:3000/api/todolist', { cache: "no-store" });
    return res.json();
}

export async function postTodo({id, todo}: {id: any, todo: any}): Promise<any> {
    const res = await fetch ('http://localhost:3000/api/todolist', {
        method : 'POST',
        headers : { 'Content-type': 'application/json'},
        body : JSON.stringify({
            id : id, 
            todo : todo
        })
    })
    return res.json()
}

export async function getTodoById(id: Number): Promise<any> {
    const res = await fetch(`http://localhost:3000/api/todolist/${id}`, { cache: "no-store" });
    return res.json();
}

export async function getIsDone() {
    const res = await fetch('http://localhost:3000/api/todolist')
}