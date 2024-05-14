import React, { useState } from 'react';
import axios from 'axios';



export default function AddTodo({ fetchTodos }){
    const [inputText, setInputText] = useState('');
    const [nextId, setNextId] = useState(1)
    function addTodo(){
        if (inputText.trim() !== '') {
            axios.post('https://jsonplaceholder.typicode.com/todos', {
                id: nextId + 1,
              title: inputText,
              completed: false
            })
            .then(response => {
              console.log('New todo added: ', response.data);
              fetchTodos();
              setInputText('');
            })
            .catch(error => {
              console.error('Error adding todo:', error);
            });
          }
    }

    return (
        <div className=''>
            <input type="text" value={inputText} onKeyDown={(e) => e.which === 13 && addTodo()} 
            onChange={e => setInputText(e.target.value)} placeholder="Enter a new todo" className='border-gray-300 border rounded-1 px-4 py-2 ml-5'/>
            <button onClick={addTodo} className='font-bold bg-blue-500 text-white px-4 py-2 rounded-r ml-1'>Add Todo</button>
        </div> 
    )
}