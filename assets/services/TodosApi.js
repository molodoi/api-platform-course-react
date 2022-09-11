import axios from "axios";
import Cache from "./cache";

async function findAll() {
    const cachedTodos = await Cache.get("todos");
    if (cachedTodos) return cachedTodos;
    return axios.get("https://127.0.0.1:8000/api/todos/").then(response => {
        const todos = response.data["hydra:member"];
        Cache.set("todos", todos);
        return todos;
    });
}

async function find(id) {
    const cachedTodo = await Cache.get("todos." + id);
    if (cachedTodo) return cachedTodo;
    return axios.get("https://127.0.0.1:8000/api/todos/" + id).then(response => {
        const todo = response.data;    
        Cache.set("todos." + id, todo);    
        return todo;
    });
}


function deleteTodo(id) {
    return axios.delete("https://127.0.0.1:8000/api/todos/" + id).then(async response => {
        const cachedTodos = await Cache.get("todos");
        if (cachedTodos) {
            Cache.set("todos", cachedTodos.filter(c => c.id !== id));
        }
        return response;
    });
}

function update(id, todo) {
    return axios.put("https://127.0.0.1:8000/api/todos/" + id, todo).then(async response => {
        const cachedTodos = await Cache.get("todos");
        const cachedTodo = await Cache.get("todos." + id);    
        if (cachedTodo) {
          Cache.set("todos." + id, response.data);
        }    
        if (cachedTodos) {
          const index = cachedTodos.findIndex(c => c.id === +id);
          cachedTodos[index] = response.data;
        }    
        return response;
    });
}
  
function create(todo) {
    return axios.post("https://127.0.0.1:8000/api/todos", todo).then(async response => {
        const cachedTodos = await Cache.get("todos");    
        if (cachedTodos) {
          Cache.set("todos", [...cachedTodos, response.data]);
        }    
        return response;
    });
}

export default {
    findAll,
    find,
    create,
    update,
    delete: deleteTodo
};