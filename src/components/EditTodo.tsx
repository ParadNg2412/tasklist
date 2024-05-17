import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function EditTodo({todo, onSave, onCancel} : {
    [key: string]: any;
}){
    const [editedTitle, setEditedTitle] = useState('');
    
    useEffect(() => {
        if(todo){
            setEditedTitle(todo.title);
        }
    }, [todo]);

    const saveEditTodo = (e:any) => {
        e.preventDefault();
        if(editedTitle.trim() === ""){
            alert('Todo title cannot be empty! Please input Todo title!');
            return;
        }
        else{
            axios.put(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, 
                        { title: editedTitle })
                .then(() => {
                    //console.log('Edit success!', todo.id, editedTitle, todo.completed);
                                       
                })
                .catch(error => {
                    console.error('Error updating todo:', error);
                }).finally(() => {
                    console.log('Edit success!', todo.id, editedTitle, todo.completed);
                    onSave(todo.id, editedTitle, todo.completed);
                });
        }       
    };

    return (
        <div className=''>
            <form className='justify-enter items-center py-3' onSubmit={(e)=>saveEditTodo(e)} onReset={onCancel}>
                <input type="text" value={editedTitle} onChange={(e) => {setEditedTitle(e.target.value)}}
                         onKeyDown={(e) => e.which === 13 && saveEditTodo(e)} className='border-gray-300 border rounded-1 px-4 py-2'/>
                <button type="submit" className='bg-green-500 text-white px-4 py-2 rounded-r ml-1'>Save</button>
                <button type="reset" className='bg-gray-400 text-white px-4 py-2 rounded-r ml-1'>X</button>
            </form>
        </div>
    );
}