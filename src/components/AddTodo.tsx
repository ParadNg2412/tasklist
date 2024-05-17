import React, { useState } from 'react';
import axios from 'axios';



export default function AddTodo({ todos, setTodos } : {[key: string]: any}){
    const [inputText, setInputText] = useState('');
    const [nextId, setNextId] = useState(201);
    
    function addTodo(){
        if (inputText.trim() !== '') {
            axios.post('https://jsonplaceholder.typicode.com/todos', {
              id: nextId,
              title: inputText,
              completed: false
            })
            .then(response => {
              console.log('New todo added: ',[...todos,response.data]);
              setTodos([ 
                {...response.data,
                id: nextId}, ...todos
              ]);             
              setInputText('');
              setNextId(prevId => prevId + 1);
            })
            .catch(error => {
              console.error('Error adding todo:', error);
            });
        }
        else{
          alert("Please input Todo title before adding!");
        }
    }
    return (
        <span className=''>
            <input type="text" value={inputText} onKeyDown={(e) => e.which === 13 && addTodo()} 
                    onChange={e => setInputText(e.target.value)} placeholder="Enter a new todo" className='border-gray-500 border rounded-1 px-5 py-2 ml-5'/>
            <button onClick={addTodo} className='font-bold bg-blue-500 text-white px-4 py-2 rounded-r ml-1 mb-2'>Add Todo</button>
        </span>
         
    )
}