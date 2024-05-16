import React, { useState } from 'react';
import axios from 'axios';

export default function EditTodo({todo, onSave, onCancel}){
    const [editedTitle, setEditedTitle] = useState('');
    
    const saveEditTodo = (e) => {
        e.preventDefault();
        if(editedTitle.trim() === ""){
            alert('Todo name cannot be empty! Please input Todo name!');
            return;
        }
        else{
            axios.put(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, 
                        { title: editedTitle })
                .then(() => {
                    console.log('Edit success!', todo.id, editedTitle)
                    onSave(todo.id, editedTitle);
                })
                .catch(error => {
                    console.error('Error updating todo:', error);
                });
        }       
    };

    return (
        <div className=''>
            <form className='justify-enter items-center' onSubmit={(e)=>saveEditTodo(e)}>
                <input type="text" value={editedTitle} onChange={(e) => {setEditedTitle(e.target.value)}} className='border-gray-300 border rounded-1 px-4 py-2'/>
                <button type="submit" className='bg-green-500 text-white px-4 py-2 rounded-r'>Save</button>
                <button onClick={onCancel} className='bg-gray-400 text-white px-4 py-2 rounded-r ml-1'>X</button>
            </form>
        </div>
    );
}