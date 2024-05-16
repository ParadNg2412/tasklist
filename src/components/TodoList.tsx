'use client'
import React, {useState , useEffect} from 'react'
import {useAutoAnimate} from '@formkit/auto-animate/react';

import axios from 'axios';
import TodoItem from './TodoItem'
import AddTodo from './AddTodo';
import SearchTodo from './SearchTodo';
import SortbyStt from './SortTodoStt';


type Props = {}

export default function TodoApp({}: Props) {
    const [animationParent] = useAutoAnimate();
    const [todos, setTodos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortByStatus, setSortByStatus] = useState('all');

    //Fetch API
    function fetch(){
        axios.get('https://jsonplaceholder.typicode.com/todos')
            .then(response => {
                console.log('Fetch success', response.data);
                setTodos(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    useEffect(() => {
        fetch();
    }, []);

    //Xu ly search
    const SearchTerm = (term) => {
        setSearchTerm(term);
    };

    

    const onEdit = (id: number, editedTitle: string) => {
        console.log('id:',id)
        console.log('todo:',todos)
        const a = todos.find(item => item.id === id && item);
        const c = todos.map(item => item.id === id ? {...a, title: editedTitle} : item)
        setTodos(c);
        
    };



    return (
        <div className=''>
            <h2 className='font-serif text-6xl font-bold mb-2'>Todo App</h2>
            <h3 className='font-sans text-2xl mb-4'>Task management</h3>
            <span>
                <AddTodo setTodos={setTodos} todos={todos}/>
                <SearchTodo setSearchTerm={SearchTerm} fetchSearchResult={SearchTerm}/>
            </span>
            <SortbyStt setSortByStt={setSortByStatus} />
            
            
            <ul ref={animationParent}>
                
                
                {
                    
                    todos
                    
                        ?.filter(todo => {
                            if(sortByStatus === 'all') return true;
                            if(sortByStatus === 'completed') return todo.completed;
                            if(sortByStatus === 'incomplete') return !todo.completed;
                            return true;
                        })
                        ?.filter(todo => todo.title.toLowerCase().includes(searchTerm.toLowerCase()))
                        ?.map( (todo ,index) => (
                            //key={`${todo?.id} +'-'+ ${index}`}  key={todo.id}
                            <TodoItem key={`${todo?.id} +'-'+ ${index}`} todo={todo} onEdit={onEdit} setTodos={setTodos} todos={todos} />                      
                        ))
                }           
            </ul>
        </div>
  )
}