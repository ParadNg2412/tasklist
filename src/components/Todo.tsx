'use client'
import React, { useRef, useState , useEffect} from 'react'
import {useAutoAnimate} from '@formkit/auto-animate/react';
import moment from 'moment';

type Props = {}

export default function TodoApp({}: Props) {
    const [animationParent] = useAutoAnimate();
    const init = [
        {id:1, tkname:"Todo web Layout", from: "2024-05-03T09:00", to: "2024-05-03T17:00", completed: true, duration: 0},
        {id:2, tkname:"Simple CRUD functions", from: "2024-05-04T08:00", to: "2024-05-04T17:00", completed: true, duration: 0},
        {id:3, tkname:"Datetime layout for each task", from: "2024-05-02T08:00", to: "2024-05-02T17:00", completed: false, duration: 0}
    ]
    const [todos, setTodos] = useState(init);
    const [inputText, setInputText] = useState("");
    const [editeMode, setEditeMode] = useState<number | null>(null);
    const [editedText, setEditedText] = useState("");
    const [inputDate1, setInputDate1] = useState("");
    const [inputDate2, setInputDate2] = useState("");
    const [isEditedText, setIsEditedText] = useState<number | null>(null);
    const [inputItem, setInputItem] = useState("");
    
    
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
                completed: false , //Trang thai Task sau khi tao luon mac dinh la "Chua hoan thanh"
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
        const updatedTodos = todos.map((todo) => todo.id === editeMode ? {...todo, tkname:editedText, from:inputDate1, to:inputDate2, duration: hh + ':' + mm + ':' + ss}:todo);
        setTodos(updatedTodos);
        setEditeMode(null);
    }

    function cancelEdit(){       
        setEditeMode(null);
        setIsEditedText(null);
    }

    
    function searchTodo(){
        
        // if(inputItem === ""){
        //     //setTodos([...todos]);                  
        //     return;
        // }
        // const filterSearch = todos.filter((item) => {
        //     if(item.tkname.toLowerCase().includes(inputItem.toLowerCase())){
        //         setTodos([...todos]);
        //         return item;
        //     }           
        // })
        // setTodos(filterSearch);
        // setInputItem(""); 

        const term = inputItem.toLowerCase();
        if(term === ''){
            setTodos(init);
        }
        else{
            const foundTodo = init.filter(todos => todos.tkname.toLowerCase().includes(term));
            setTodos(foundTodo);
            setInputItem("");
        }
        
    }

    function cancelSearch(){
        setInputItem("");
        setTodos(init);
    }

    function updateStt(id: number) {
        const index = todos.findIndex((todo) => todo.id === id);
        const updateStatus = todos[index]["completed"] !== true ? true : false;
        todos[index]["completed"] = updateStatus;
        setTodos([...todos]);
    }

    function sortbydate(ascend: boolean) {
        // const sortedTask = [...todos].sort((a, b) => {
        //     return new Date(a.from).getTime() - new Date(b.from).getTime();
        // });
        // setTodos(sortedTask);
        const sortedTask = [...todos].sort((a, b) => {
            return ascend ? new Date(a.from).getTime() - new Date(b.from).getTime() : new Date(b.from).getTime() - new Date(a.from).getTime();
        });
        setTodos(sortedTask);
    }

    function sortbystatus() {
        const sortedTask = [...todos].sort((a, b) => {
            return a.completed === b.completed ? 0 : a.completed ? -1 : -1;
        });
        setTodos(sortedTask);
    }


  return (
    <div className=''>
        <h2 className='text-6xl font-bold mb-2'>Todo App</h2>
        <h3 className='text-2xl mb-4'>Task management</h3>
        <div className='mb-5'>
            <input onChange={(e) => {
                setInputText(e.target.value), 
                setIsEditedText(null)
            }} value={inputText} type='text' 
            onKeyDown={(e) => e.which === 13 &&  addTodo()}
            placeholder='Add a todo...' className='border-gray-300 border rounded-1 px-4 py-2'/>

            <button onClick={addTodo} className='bg-blue-500 text-white px-4 py-2 rounded-r'>Add</button>
            <input onChange={(e) => {setInputItem(e.target.value)}} value={inputItem} type='text'  
            onKeyDown={(e) => e.which === 13 &&  searchTodo()} placeholder='Search Todo...' className='border-gray-500 border rounded-1 px-4 py-2 ml-40'/>
            <button onClick={() => searchTodo()} className='bg-gray-500 text-white px-4 py-2 rounded-r'>Search</button>
            <button onClick={() => cancelSearch()} className='bg-gray-500 text-white px-4 py-2 rounded-r ml-1'>Cancel</button>
        </div>
        <div className='mb-5'>
            <span>
                <span className='font-bold mr-2'>Sort by date:</span>
                <button onClick={() => sortbydate(true)} className='bg-gray-400 text-white px-4 py-2 rounded-r font-bold'>Ascend</button>
                <button onClick={() => sortbydate(false)} className='bg-gray-400 text-white px-4 py-2 rounded-r font-bold ml-2'>Descend</button>
            </span>           
            <button onClick={sortbystatus} className='bg-gray-300 text-black px-4 py-2 rounded-r font-bold ml-6'>Sort by status</button>
        </div>
        
        <ul ref={animationParent}>
            {
                todos.map( (todo, index) => (
                    <li key={todo.id} className='flex item-center justify-between border py-2 mb-2'>
                        <div className='w-full ml-3'>
                            {isEditedText !== index  && <span className='bg-gray-200 font-bold border-b'>{todo.tkname}</span>}                           
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
                                    <span className={`${todo.completed === true ? 'text-green-400':'text-red-500'} font-bold ml-1`}>
                                        {`${todo.completed === true ? "Completed" : "Incomplete"}`}
                                    </span>
                                </span>
                                <button onClick={() => updateStt(todo.id)} className={`${todo.completed === true ? 'enable' : 'false'}
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