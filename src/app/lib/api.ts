//file API TODOLIST {GET, POST, DELETE, PATCH} CRUD

export async function getTodo() {
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

export async function deteleTodo({id}: {id : Number}) {
    const res = await fetch(`http://localhost:3000/api/todolist/${id}`,{
        method: 'DELETE'
    })
    return res.json()
}

export async function ChangeType({id, completed}: {id: Number, completed: boolean}) {
    const res = await fetch(`http://localhost:3000/api/todolist/${id}`,{
        method: 'PATCH',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
            id,completed
        })
    }, )
    return res.json()
}


export async function getTodosByType({completed} : {completed : boolean}) {
    const res = await fetch(`http://localhost:3000/api/todolist/`, {
            cache: "no-store"
     });
    let data = await res.json();
    data.todos = data.todos.todos.map((todo : any) => todo.completed === completed)
    return data
}


export async function getTodoById({id}: {id: Number}) {
    const res = await fetch(`http://localhost:3000/api/todolist/${id}`, { cache: "no-store" });
    return res.json(); 
}


