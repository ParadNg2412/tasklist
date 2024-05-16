'use client'
import React, {useState} from 'react'
//import {useAutoAnimate} from '@formkit/auto-animate/react';
import EditTodo from './EditTodo';
import DelTodo from './DelTodo';
import Status from './Status';



type Props = {}

export default function TodoItem({todo, onEdit, todos, setTodos}) {
    // const [animationParent] = useAutoAnimate();
    const [editMode, setEditMode] = useState(false);

    const editTodo = () => {
      setEditMode(true);
    }
    
    const CancelEdit = () => {
      setEditMode(false);
    };

    const onSave = (id:number, editedTitle:string) => {
      onEdit(id, editedTitle);
      CancelEdit();
    }


  return (
    <div className=' bg-gray-100 w-full ml-3 border mb-1 mt-2 pl-2 pr-2'>
      {!editMode ? (
        <div>
            <ul className='font-sans text-2xl font-bold'>{todo.title}</ul>
            <div className='flex item-center justify-between py-2 mb-2'>
              <ul className=''>
                <span className='text-gray-600'>Status: </span>
                <span className={`${todo.completed === true ? 'text-green-400':'text-red-500'} font-bold ml-1`}>{`${todo.completed === true ? "Completed" : "Incomplete"}`}</span>
                <Status todoId={todo.id} completed={todo.completed} todos={todos} setTodos={setTodos}/>
              </ul>
            </div>
            <div className='flex font-bold border mt-2 mb-1'>
              <button onClick={editTodo} className='bg-green-500 border rounded-1 px-2 text-white m-1'>Edit</button>
              <DelTodo todoId={todo.id} todos={todos} setTodos={setTodos} />
            </div>
        </div>) : (
        <EditTodo todo={todo} onSave={onSave} onCancel={CancelEdit}/>
        
      )} 
    </div>
  )
}