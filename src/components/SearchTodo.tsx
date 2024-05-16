import React, { useState } from 'react';
import debounce from 'lodash/debounce';

export default function SearchTodo({setSearchTerm, fetchSearchResult}){
    const [searchText, setSearchText] = useState('');
    

    const searchTodo = debounce((key) => {
        setSearchTerm(key.trim());
        fetchSearchResult(key.trim());
    }, 300);

    const change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const key = e.target.value;
        setSearchText(key);
        searchTodo(key);
    }

    function cancelSearch() {
        setSearchText("");
        setSearchTerm("");
    }

    return (    
        <span className='px-20'>
            <input  type="text" value={searchText} 
                onChange={change} placeholder='Search Todo...' className='border-gray-500 border rounded-1 px-5 py-2 ml-40'/>
            {searchText && <button onClick={() => cancelSearch()} className='font-bold bg-gray-400 text-white px-4 py-2 rounded-r ml-0'>Cancel</button>}
            <button onClick={(key) => searchTodo(key)} className='font-bold bg-gray-500 text-white px-4 py-2 rounded-r ml-1'>Search</button>
            
        </span> 
    );
}