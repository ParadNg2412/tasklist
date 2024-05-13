'use client'
import React, { useRef, useState , useEffect} from 'react'
import {useAutoAnimate} from '@formkit/auto-animate/react';
import moment from 'moment';
import Popup from 'reactjs-popup';
import debounce from 'lodash/debounce';

// moment().format('MMMM Do YYYY h:mm:ss ');

type Props = {}

export default function TodoApp({}: Props) {
    const [animationParent] = useAutoAnimate();
    const init = [
        {id:1, tkname:"Todo web Layout", from: "2024-05-03 09:00", to: "2024-05-03 17:00", completed: true, duration: '9:0:0'},
        {id:2, tkname:"Simple CRUD functions", from: "2024-05-04 08:00", to: "2024-05-04 17:00", completed: true, duration: '9:0:0'},
        {id:3, tkname:"Datetime layout for each task", from: "2024-05-02 08:00", to: "2024-05-02 17:00", completed: false, duration: '9:0:0'}
    ]
    const [todos, setTodos] = useState(init);
    const [inputText, setInputText] = useState("");
    const [inputDateEnd, setInputDate] = useState("")
    const [editeMode, setEditeMode] = useState<number| null>(null);
    const [editedText, setEditedText] = useState("");
    const [inputDate1, setInputDate1] = useState("");
    const [inputDate2, setInputDate2] = useState("");
    const [isEditedText, setIsEditedText] = useState<number | null>(null);
    
    
    
    function addTodo(){
        if(inputText.trim() !== ''){
            // const isExistingTodo = todos.some((todo) => todo.tkname === inputText 
            // && todo.from === inputDate1 && todo.to === inputDate2);
            // if(isExistingTodo){
            //     alert("This Todo already exist!");
            //     setInputText("");
            //    return;
            const newTodo = {
                id: todos.length + 1,
                tkname: inputText,
                from: moment().format("YYYY-MM-DD HH:mm"),
                to: inputDateEnd,
                completed: false , //Trang thai Task sau khi tao luon mac dinh la "Chua hoan thanh"
                duration: '0:0:0'  //Chua co set thoi gian nen duration luon la 0
            };
            setTodos([...todos, newTodo]);
            
            setInputText("");
        }
    }

    const [deleteTodo, setDeleteTodo] = useState(null);
    function delTodo(id: number){
        setDeleteTodo(id);
    }

    function confirmDel() {
        const updatedTodos = todos.filter(todo => todo.id !== deleteTodo);
        setTodos(updatedTodos);
        setDeleteTodo(null);
    }

    function cancelDel() {
        setDeleteTodo(null);
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
        if(editedText.trim() === ''){
            alert("Warning: Todo's name cannot be empty! Please input Todo's name")
            return;
        }
        else{
            const hh = moment.duration(Number(moment(inputDate2).format("X")) -  Number(moment(inputDate1).format("X")), 'seconds').asHours();
            const mm = moment.duration(Number(moment(inputDate2).format("X")) -  Number(moment(inputDate1).format("X")), 'seconds').minutes();
            const ss = moment.duration(Number(moment(inputDate2).format("X")) -  Number(moment(inputDate1).format("X")), 'seconds').seconds();
            const updatedTodos = todos.map((todo) => todo.id === editeMode ? {...todo, tkname:editedText, from:inputDate1, to:inputDate2, duration: hh + ':' + mm + ':' + ss}:todo);
            setTodos(updatedTodos);
            
        }
        setEditeMode(null);
    }

    function cancelEdit(){       
        setEditeMode(null);
        setIsEditedText(null);
    }

    const [searchResult, setSearchResult] = useState<[...todos]>([]);
    const [inputItem, setInputItem] = useState("");
    const debounceSearch = debounce((key: string) => {
        const results = todos.filter(todo => todo.tkname.toLowerCase().includes(key.toLowerCase()));
        setSearchResult(results);
    }, 300);

    const ChangeKey = (e: React.ChangeEvent<HTMLInputElement>) => {
        const key = e.target.value;
        setInputItem(key);
        debounceSearch(key);
    };

    function searchTodo(){
        debounceSearch(inputItem);
    }
    
    function cancelSearch(){
        setInputItem("");
        setSearchResult([]);       
    }

    function updateStt(id: number) {
        const index = todos.findIndex((todo) => todo.id === id);
        const updateStatus = todos[index]["completed"] !== true ? true : false;
        todos[index]["completed"] = updateStatus;
        setTodos([...todos]);
    }


    function sortbydate(ascend: boolean) {
        const sortedTask = [...todos].sort((a, b) => {
            return ascend ? new Date(a.from).getTime() - new Date(b.from).getTime() : new Date(b.from).getTime() - new Date(a.from).getTime();
        });
        setTodos(sortedTask);
    }

    const [showCompleted, setShowCompleted] = useState<boolean>(true);
    const filterdTodo = showCompleted ? todos.filter(todo => todo.completed) : todos.filter(todo => !todo.completed)
    function ToggleShowTodo() {
        setShowCompleted(!showCompleted);
    }

  return (
    <div className=''>
        <h2 className='text-6xl font-bold mb-2'>Todo App</h2>
        <h3 className='text-2xl mb-4'>Task management</h3>
        <div className='mb-5'>
            <span className='font-bold mb-2'>Title
                <input onChange={(e) => {
                    setInputText(e.target.value), 
                    setIsEditedText(null)
                }} value={inputText} type='text' 
                onKeyDown={(e) => e.which === 13 &&  addTodo()}
                placeholder='Add a todo...' className='border-gray-300 border rounded-1 px-4 py-2 ml-5'/>
            </span>          
            <span className='font-bold mb-3 ml-5'>Deadline
                <input onChange={(e) => {setInputDate(e.target.value)}} value={inputDateEnd} 
                type='datetime-local' className='bg-white-300 border rounded-1 px-2 py-2 ml-2'/>               
            </span>

            <button onClick={addTodo} className='font-bold bg-blue-500 text-white px-4 py-2 rounded-r ml-1'>Add Todo</button>
            <input onChange={ChangeKey} value={inputItem} type='text' //onKeyDown={(e) => e.which === 13 &&  searchTodo()} 
             placeholder='Search Todo...' className='border-gray-500 border rounded-1 px-4 py-2 ml-40'/>
            <button onClick={() => searchTodo()} className='font-bold bg-gray-500 text-white px-4 py-2 rounded-r ml-0'>Search</button>
            {inputItem && <button onClick={() => cancelSearch()} className='bg-gray-500 text-white px-4 py-2 rounded-r ml-1'>Cancel</button>}
            
        </div>
        <div className='mb-5'>
            <span>
                <span className='font-bold mr-2'>Sort by date:</span>
                <button onClick={() => sortbydate(true)} className='bg-gray-400 text-white px-4 py-2 rounded-r font-bold'>Ascend</button>
                <button onClick={() => sortbydate(false)} className='bg-gray-400 text-white px-4 py-2 rounded-r font-bold ml-1'>Descend</button>
            </span>

            <span>
            <span className='font-bold mr-2 ml-6'>Sort by status:</span>
                {/* <button  className='bg-gray-400 text-black px-4 py-2 rounded-r font-bold ml-2'>Sort by Status</button> */}
                <button onClick={ToggleShowTodo} className='bg-gray-400 text-white px-4 py-2 rounded-r font-bold ml-2'>{showCompleted ? "Completed" : "Incomplete"}</button>
                {/* <button  className='bg-red-500 text-white px-4 py-2 rounded-r font-bold ml-2'>Incomplete</button> */}
            </span>           
            
        </div>
        
        <ul ref={animationParent}>
            {
                (inputItem ? searchResult  : todos && filterdTodo).map( (todo, index) => (
                    <li key={todo.id} className='flex item-center justify-between border py-2 mb-2'>
                        
                        <div className='w-full ml-3'>
                            
                            {isEditedText !== index  && <span className='text-2xl font-bold border-b'>{todo.tkname}</span>}                           
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
                                <ul className=''>Start: {(moment(todo.from).format("YYYY-MM-DD HH:mm"))}</ul>
                                <ul className=''>Deadline: {(moment(todo.to).format("YYYY-MM-DD HH:mm"))}</ul>
                                <ul>Duration: {todo.duration}</ul>
                                <span>Status: 
                                    <span className={`${todo.completed === true ? 'text-green-400':'text-red-500'} font-bold ml-1`}>
                                        {`${todo.completed === true ? "Completed" : "Incomplete"}`}
                                    </span>
                                </span>
                                <button onClick={() => updateStt(todo.id)} className={`${todo.completed === true ? 'hidden' : 'false'}
                                 bg-gray-400 border text-white font-bold rounded-r px-1 ml-2`}>Submit</button>
                                <button onClick={() => updateStt(todo.id)} className={`${todo.completed === true ? 'enable' : 'hidden'}
                                 bg-gray-400 border text-white font-bold rounded-r px-1 ml-2`}>Revert</button>
                                 
                                <div className='flex font-bold border mt-2'>
                                    <button onClick={() => editTodo(todo.id)} className='bg-green-500 border rounded-1 px-2 text-white m-1'>Edit</button>
                                    <button onClick={() => delTodo(todo.id)} className='bg-red-500 border rounded-1 px-2 text-white m-1'>Delete</button>
                                    <Popup open={deleteTodo!== null} closeOnDocumentClick={false} onClose={cancelDel}>
                                        <div className='border bg-white px-6 py-6'>
                                            <h2>Are you sure you wanna delete this Todo ?</h2>
                                            <button onClick={confirmDel} className='bg-green-500 font-bold border rounded-1 px-2 text-white m-1 ml-6 mt-5'>Confirm</button>
                                            <button onClick={cancelDel} className='bg-gray-400 font-bold border rounded-1 px-2 text-white m-1 ml-4'>Cancel</button>
                                        </div>
                                    </Popup>
                                    
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