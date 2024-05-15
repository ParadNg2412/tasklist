'use client'
import React, { useRef, useState , useEffect} from 'react'
import {useAutoAnimate} from '@formkit/auto-animate/react';
import EditTodo from './EditTodo';
import DelTodo from './DelTodo';



type Props = {}

export default function TodoItem({todo, onEdit, todos, setTodos}) {
    const [animationParent] = useAutoAnimate();
    const [editMode, setEditMode] = useState(false);

    const editTodo = () => {
      setEditMode(true);
    }

    

    const CancelEdit = () => {
      setEditMode(false);
    };

    const onSave = (id, editedTitle) => {
      onEdit(id, editedTitle);
      CancelEdit();
  }

  return (
    <div className='w-full ml-3 border mb-1 mt-2'>
      {!editMode ? (
        <div>
            <ul className='text-2xl font-bold'>{todo.title}</ul>
            <div className='flex item-center justify-between py-2 mb-2'>
              <ul>Status: 
                {todo.completed}
              </ul>
            </div>
            <div className='flex font-bold border mt-2'>
              <button onClick={editTodo} className='bg-green-500 border rounded-1 px-2 text-white m-1'>Edit</button>
              <DelTodo todoId={todo.id} todos={todos} setTodos={setTodos} />
            </div>
        </div>) : (
        <EditTodo todo={todo} onSave={onSave} onCancel={CancelEdit} />
        
      )} 
    </div>
  )
}