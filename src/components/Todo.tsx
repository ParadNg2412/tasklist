'use client'
import React, { useRef, useState } from 'react'
import {useAutoAnimate} from '@formkit/auto-animate/react';

type Props = {}

export default function TodoApp({}: Props) {
    const [animationParent] = useAutoAnimate();
    const [todos, setTodos] = useState([
        {id:1, text:"Task 1"},
        {id:2, text:"Task 2"},
        {id:3, text:"Task 3"}
    ]);
    const [inputText, setInputText] = useState("");
    const [editeMode, setEditeMode] = useState<number | null>(null);
    const [editedText, setEditedText] = useState("");
    const [isEditedText, setIsEditedText] = useState<number | null>(null);
    const [searchItem, setSearchItem] = useState("");
    const [searchFilter, setSearchFilter] = useState<number | null>(null);

    function addTodo(){
        if(inputText.trim() !== ''){
            const isExistingTodo = todos.some((todo) => todo.text === inputText);
            if(isExistingTodo){
                alert("This Todo already exist!");
                setInputText("");
                return;
            }
            const newTodo = {
                id: todos.length + 1,
                text: inputText
            };
            setTodos([...todos, newTodo]);
            setInputText("");
        }
    }

    function delTodo(id: number){
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
    }

    function editTodo(id: number){
        setEditeMode(id);
        const todoToEdit = todos.find((todo) => todo.id == id);
        if(todoToEdit){
            setEditedText(todoToEdit.text);
        }
    }

    function saveEditedTodo(){
        const updatedTodos = todos.map((todo) => todo.id === editeMode ? {...todo, text:editedText }:todo);
        setTodos(updatedTodos);
        setEditeMode(null);
    }

    function cancelEdit(){       
        setEditeMode(null);
        setIsEditedText(null);
    }

    function searchtask(id: number){
        setSearchFilter(id);
        if(searchItem.trim() !== ''){
            const isExistingTodo = todos.filter((todo) => todo.text === searchItem);
            if(isExistingTodo){
                console.log(isExistingTodo);
                setSearchFilter(searchFilter);
                setSearchItem("");
            }
            else{
                alert("Todo does not exist!");
                setSearchItem("");
            }
            
        }
    }

  return (
    <div className=''>
        <h2 className='text-6xl font-bold mb-2'>Todo App</h2>
        <h3 className='text-2xl mb-4'>Task management</h3>
        <div className='mb-5'>
            <input onChange={(e) => {
                setInputText(e.target.value)
                setIsEditedText(null)
            }} value={inputText} type='text' 
            onKeyDown={(e) => e.which === 13 &&  addTodo()}
            placeholder='Add a todo...' className='border-gray-300 border rounded-1 px-4 py-2'/>
            <button onClick={addTodo} className='bg-blue-500 text-white px-4 py-2 rounded-r'>Add</button>
            <input onChange={(e) => {
                setSearchItem(e.target.value),
                setSearchFilter(null)
            }} value={searchItem} type='text'
            onKeyDown={(e) => e.which === 13 &&  searchtask()} placeholder='Search Todo...' className='border-gray-500 border rounded-1 px-4 py-2 ml-40'/>
            <button onClick={()=>searchtask()} className='bg-gray-500 text-white px-4 py-2 rounded-r'>Search</button>
        </div>
        
        <ul ref={animationParent}>
            {
                todos.map( (todo, index) => (
                    <li key={todo.id} className='flex item-center justify-between border-b py-2'>
                        <div className='w-full'>
                            {isEditedText !== index  && <span className='font-bold '>{todo.text}</span>}
                            {editeMode === todo.id ? 
                            <form className='justify-enter items-center'>
                            
                                <input onChange={(e) => {
                                    setEditedText(e.target.value),
                                    setIsEditedText(index.toString())
                                }} value={editedText} type="text" 
                                className='border-gray-300 border rounded-1 px-4 py-2'/>
                                <button onClick={()=> saveEditedTodo()} className='bg-green-500 text-white px-4 py-2 rounded-r'>Save</button>
                                <button onClick={()=> cancelEdit()} className='bg-gray-400 text-white px-4 py-2 rounded-r'>X</button>                              
                            </form> : 
                            <div className=''>
                            <span>Deadline: </span>
                                <button onClick={() => editTodo(todo.id)} className='text-green-500 m-2 ml-40'>Edit</button>
                                <button onClick={() => delTodo(todo.id)} className='text-red-500'>Delete</button>
                            </div> }
                            
                        </div>  
                    </li>
                ))
            }           
        </ul>
    </div>
  )
}