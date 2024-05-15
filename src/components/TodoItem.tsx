'use client'
import React, { useRef, useState , useEffect} from 'react'
import {useAutoAnimate} from '@formkit/auto-animate/react';
import axios from 'axios';



type Props = {}

export default function TodoItem({todo, fetchTodos}) {
    const [animationParent] = useAutoAnimate();
    const [editMode, setEditMode] = useState(false);
    
    // function deleteTodo(id: number){
    //     if(window.confirm('Are you sure you want to delete this Todo ?')){
    //         axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    //         .then(() => {
    //             fetchTodos();
    //         })
    //         .catch(error => {
    //             console.error('Error deleting todo: ', error);
    //         })
    //     }
        
    // }

    // const toggleCompleted = (){
    //     axios.put(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
    //         ...todo,
    //         completed: !todo.completed
    //     })
    //     .then(() => {
    //         fetchTodos();
    //     })
    //     .catch(error => {
    //         console.error('Error updating todo: ', error);
    //     });
            
    // };
    
    // const toggleEditMode = () => {
    //     setEditMode(prevState => ! PrevState);
    // }

  return (
    <div className='w-full ml-3 border mb-1 mt-2'>
        <ul className='text-2xl font-bold'>{todo.title}</ul>
        <div className='flex item-center justify-between py-2 mb-2'>
            
            <ul>Status: 
                {todo.completed}
            </ul>
        </div>
        
                       
        
    </div>
  )
}