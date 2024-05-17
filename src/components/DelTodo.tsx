import React from 'react';
import axios from 'axios';

export default function DelTodo({todoId, todos, setTodos} : {
    todoId: number;
    [key: string]: any;
}){
    
    const DeleteTodo = (id:number) => {
        if (window.confirm('Are you sure you want to delete this Todo ?')) {
            axios.delete(`https://jsonplaceholder.typicode.com/todos/${todoId}`)
                .then(() => {
                    console.log('Todo deleted', id);
                    setTodos(todos.filter((todo:any) => todo.id !== id));
                    console.log('New Todo list: ', todos);
                })
                .catch(error => {
                    console.error('Error deleting todo:', error);
                });
        }
      };

    return (
        <span className=''>
            <button onClick={()=>DeleteTodo(todoId)} className='bg-red-500 border rounded-1 px-2 text-white m-1'>Delete</button>
        </span>
    );
}