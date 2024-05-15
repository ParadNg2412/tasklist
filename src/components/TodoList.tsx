'use client'
import React, {useState , useEffect} from 'react'
import {useAutoAnimate} from '@formkit/auto-animate/react';

import axios from 'axios';
import TodoItem from './TodoItem'
import AddTodo from './AddTodo';
import SearchTodo from './SearchTodo';


type Props = {}

export default function TodoApp({}: Props) {
    const [animationParent] = useAutoAnimate();
    const [todos, setTodos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    //Fetch API
    function fetch(){
        axios.get('https://jsonplaceholder.typicode.com/todos')
            .then(response => {
                setTodos(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    useEffect(() => {
        fetch();
    }, []);

    //Add
    // const [inputText, setInputText] = useState("");
    
    // function addTodo(){
    //     if(inputText.trim() !== ''){
    //         axios.post('https://jsonplaceholder.typicode.com/todos',{   
    //             id: count + 1,          
    //             title: inputText,
    //             completed: false
    //             })
    //             .then(response => {
    //                 setTodos([...todos, response.data]);
    //                 setInputText("");
    //             })
    //             .catch(error => {
    //                 console.error('Error adding todo: ', error);
    //             });
    //     }
    // }
    //Del
    // function delTodo(id: number){
    //     const confirmDel = window.confirm("Are you sure you want to delete this todo ?");
    //     if(confirmDel){
    //         axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    //             .then(() => {
    //                 setTodos(todos.filter(todo => todo.id !== id));
    //             })
    //             .catch(error => {
    //                 console.error('Error deleteing todo: ', error);
    //             });
    //     }
    // }
    
    // const [editTodo, setEditTodo] = useState(null);
    // const [editedText, setEditedText] = useState("");
    
    // function EditTodo(todo){
        
    // }

    // function saveEditedTodo(){
    //     if(editTodo && editedText.trim() === ''){
    //         alert("Warning: Todo's name cannot be empty! Please input Todo's name")
    //         return;
    //     }
    //     else{
                
    //         }
    //  }

    // function cancelEdit(){       
    //     setEditTodo(null);
       
    // }

    // const [searchResult, setSearchResult] = useState<[...todos]>([]);
    // const [inputItem, setInputItem] = useState("");
    //  const debounceSearch = debounce((key: string) => {
    //     const results = todos.filter(todo => todo.title.toLowerCase().includes(key.toLowerCase()));
    //     setSearchResult(results);
    // }, 300);

    // const ChangeKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const key = e.target.value;
    //     setInputItem(key);
    //     debounceSearch(key);
    // };

    // function searchTodo(){
    //     debounceSearch(inputItem);
    // }
    
    // function cancelSearch(){
    //     setInputItem("");
    //     setSearchResult([]);       
    // }

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

    const SearchTerm = (term) => {
        setSearchTerm(term);
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
                        .filter(todo => todo.title.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map( (todo, index) => (
                        //key={`${todo?.id} +'-'+ ${index}`}  key={todo.id}
                        <TodoItem key={todo.id}  todo={todo} fetchTodos={fetch}/>
                        
                        ))
                }           
            </ul>
        </div>
  )
}