import React from 'react';
import axios from 'axios';

export default function Status({todoId, completed, todos, setTodos} : {
    todoId: number | null;
    completed: boolean;
    [key: string]: any;
}){
    function statusChange(){
        axios.put(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {completed})
            .then(() => {
                
                //console.log("Status updated: ", todoId, !completed);
                
            })
            .catch(error => {
                console.error('Error updating Todo Status', error);
            })
            .finally(() => {
                const updatedStt = todos.map((todo:any) => {
                    if(todo.id === todoId){
                        return {...todo, completed: !completed};
                    }
                    return todo;
                });
                console.log("Status updated: ", todoId, !completed);
                setTodos(updatedStt);
            })
    }

    return (
        <span>
            <input type='checkbox' checked={completed} onChange={statusChange} className='px-2 ml-1'/>
        </span>
    );
}