'use client'
import React, { useRef, useState } from 'react'
import {useAutoAnimate} from '@formkit/auto-animate/react';
import moment from 'moment';

moment().format();


type Props = {}

export default function TodoApp({}: Props) {
    const [animationParent] = useAutoAnimate();
    const [todos, setTodos] = useState([
        {id:1, tkname:"Todo web Layout", from: "2024/05/03T09:00", to: "2024/05/03T17:00", stt: "Completed", duration: 0},
        {id:2, tkname:"Simple CRUD functions", from: "2024/05/03T08:00", to: "2024/05/03T17:00", stt: "Completed", duration: 0},
        {id:3, tkname:"Datetime layout for each task", from: "2024/05/06T08:00", to: "2024/05/06T17:00", stt: "Completed", duration: 0}
    ]);
    const [inputText, setInputText] = useState("");
    const [editeMode, setEditeMode] = useState<number | null>(null);
    const [editedText, setEditedText] = useState("");
    const [inputDate1, setInputDate1] = useState("");
    const [inputDate2, setInputDate2] = useState("");
    const [isEditedText, setIsEditedText] = useState<number | null>(null);
    const [inputItem, setInputItem] = useState("");
    const [searchFilter, setSearchFilter] = useState(null);
    

    function addTodo(){
        if(inputText.trim() !== ''){
            const isExistingTodo = todos.some((todo) => todo.tkname === inputText 
            && todo.from === inputDate1 && todo.to === inputDate2);
            if(isExistingTodo){
                alert("This Todo already exist!");
                setInputText("");
                return;
            }
            
            
            const newTodo = {
                id: todos.length + 1,
                tkname: inputText,
                from: inputDate1,
                to: inputDate2,
                stt: "Incomplete" , //Trang thai Task sau khi tao luon mac dinh la "Chua hoan thanh"
                duration: 0  
            };
            
                // $('.countdown').text(moment(countdown).format('h:mm:ss'))
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
            setEditedText(todoToEdit.tkname);
            setInputDate1(todoToEdit.from);
            setInputDate2(todoToEdit.to);
        }
    }

    function saveEditedTodo(){
        
        const hh = moment.duration(Number(moment(inputDate2).format("X")) -  Number(moment(inputDate1).format("X")), 'seconds').asHours();
        const mm = moment.duration(Number(moment(inputDate2).format("X")) -  Number(moment(inputDate1).format("X")), 'seconds').minutes();
        const ss = moment.duration(Number(moment(inputDate2).format("X")) -  Number(moment(inputDate1).format("X")), 'seconds').seconds();
        const updatedTodos = todos.map((todo) => todo.id === editeMode ? {...todo, tkname:editedText, from:inputDate1, to:inputDate2, duration: hh + ':' + mm + ':' + ss }:todo);
              
        //console.log('123', hh + ':' + mm + ':' + ss);

        setTodos(updatedTodos);
        setEditeMode(null);
    }

    function cancelEdit(){       
        setEditeMode(null);
        setIsEditedText(null);
    }

    function searchtask(){
        const foundTodo = todos.map((todo) => todo.id === searchFilter ? {...todo, tkname: inputItem}:todo);
        if(inputItem.trim() !== ''){
            const isExistingTodo = todos.filter((todo) => todo.tkname === inputItem);
            if(isExistingTodo){
                console.log(isExistingTodo); //Ket qua hien ra o Console.log
                setTodos(foundTodo);
                setInputItem("");
            }
            else{               
                alert("Todo does not exist!");
                setInputItem("");
            }
            
        }
    }

    function updateStt(id: number) {
        const index = todos.findIndex((todo) => todo.id === id);
        const updateStatus = todos[index]["stt"] !== "Completed" ? "Completed" : "Incomplete";
        todos[index]["stt"] = updateStatus;
        setTodos([...todos]);
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
                setInputItem(e.target.value),
                setSearchFilter(null)
            }} value={inputItem} type='text'
            onKeyDown={(e) => e.which === 13 &&  searchtask()} placeholder='Search Todo...' className='border-gray-500 border rounded-1 px-4 py-2 ml-40'/>
            <button onClick={()=>searchtask()} className='bg-gray-500 text-white px-4 py-2 rounded-r'>Search</button>
        </div>
        
        <ul ref={animationParent}>
            {
                todos.map( (todo, index) => (
                    <li key={todo.id} className='flex item-center justify-between border-b py-2'>
                        <div className='w-full'>
                            {isEditedText !== index  && <span className='bg-gray-200 font-bold border-b'>{todo.tkname}</span>}
                            {/* {searchFilter == index  && <span className='font-bold '>{todo.tkname}</span>} */}
                            {editeMode === todo.id ? 
                            <form className='justify-enter items-center'>                           
                                <input onChange={(e) => {
                                    setEditedText(e.target.value),
                                    setIsEditedText(index.toString())
                                }} value={editedText} type="text" 
                                className='border-gray-300 border rounded-1 px-4 py-2'/>  
                                <ul className='py-2'>
                                    <span>From:
                                        <input onChange={(e) => {
                                            setInputDate1(e.target.value),
                                            setIsEditedText(index.toString())
                                        }} value={inputDate1} type="datetime-local" className='bg-white-300 border rounded-1 px-2 py-2 ml-2'></input> - 
                                        To: <input onChange={(e) => {
                                            setInputDate2(e.target.value),
                                            setIsEditedText(index.toString())
                                        }} value={inputDate2} type="datetime-local" className='bg-white-300 border rounded-1 px-2 py-2 ml-2'></input>
                                    </span>                                    
                                </ul>
                                <button onClick={()=> saveEditedTodo()} className='bg-green-500 text-white px-4 py-2 rounded-r'>Save</button>
                                <button onClick={()=> cancelEdit()} className='bg-gray-400 text-white px-4 py-2 rounded-r ml-1'>X</button>                         
                            </form> : 
                            <div className=''>
                                <ul className=''>Start: {todo.from}</ul>
                                <ul className=''>Deadline: {todo.to}</ul>
                                <ul>Duration: {todo.duration}</ul>
                                <span>Status: 
                                    <span  className={`${todo.stt === 'Completed' ? 'text-green-400 ':'text-red-500'} font-bold ml-1`}>{todo.stt}</span>
                                </span>
                                <button onClick={() => updateStt(todo.id)} className={`${todo.stt === 'Completed' ? 'hidden' : 'enabled'}
                                 bg-gray-400 border text-white font-bold rounded-r px-1 ml-2`}>Submit</button>
                                <div className='flex font-bold border'>
                                    <button onClick={() => editTodo(todo.id)} className='bg-green-500 border rounded-1 px-2 text-white m-1'>Edit</button>
                                    <button onClick={() => delTodo(todo.id)} className='bg-red-500 border rounded-1 px-2 text-white m-1'>Delete</button>
                                </div>                                   
                            </div> }
                            
                        </div>  
                    </li>
                ))
            }           
        </ul>
    </div>
  )
}