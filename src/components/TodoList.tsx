'use client'
import React, {useState , useEffect} from 'react'
import {useAutoAnimate} from '@formkit/auto-animate/react';

import axios from 'axios';
import TodoItem from './TodoItem'
import AddTodo from './AddTodo';
import SearchTodo from './SearchTodo';
import { title } from 'process';


type Props = {}

export default function TodoApp({}: Props) {
    const [animationParent] = useAutoAnimate();
    const [todos, setTodos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    //Fetch API
    function fetch(){
        axios.get('https://jsonplaceholder.typicode.com/todos')
            .then(response => {
                console.log('12313')
                setTodos(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    useEffect(() => {
        fetch();
    }, []);

    

    //function updateStt() {
        // const index = todos.findIndex((todo) => todo.id === id);
        // const updateStatus = todos[index]["completed"] !== true ? true : false;
        // todos[index]["completed"] = updateStatus;
        // setTodos([...todos]);
       
    //}

    // const [showCompleted, setShowCompleted] = useState<boolean>(true);
    // //const filterdTodo = showCompleted ? todos.filter(todo => todo.completed) : todos.filter(todo => !todo.completed)
    // function ToggleShowTodo() {
    //     setShowCompleted(!showCompleted);
    // }

    //Xu ly search
    const SearchTerm = (term) => {
        setSearchTerm(term);
    };

    

    const onEdit = (id, editedTitle) => {
        const a = todos.find(item => item.id === id ? {...item, title: editedTitle} : item);
        const b = {...a, title: editedTitle}
        const c = todos.map(item => item.id === id ? b : item)
        setTodos(c);
        
    };

    return (
        <div className=''>
            <h2 className='text-6xl font-bold mb-2'>Todo App</h2>
            <h3 className='text-2xl mb-4'>Task management</h3>
            <span>
                <AddTodo setTodos={setTodos} todos={todos}/>
                <SearchTodo setSearchTerm={SearchTerm} fetchSearchResult={SearchTerm}/>
            </span>
            
            
            <ul ref={animationParent}>
                
                {
                    
                    todos
                        ?.filter(todo => todo.title.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map( (todo ,index) => (
                        //key={`${todo?.id} +'-'+ ${index}`}  key={todo.id}
                        <TodoItem key={`${todo?.id} +'-'+ ${index}`} todo={todo} 
                        onEdit={onEdit}
                        setTodos={setTodos}
                        todos={todos}
                        
                        />
                        
                        ))
                }           
            </ul>
        </div>
  )
}