import React, { useState } from 'react';

export default function SortbyStt({setSortByStt}) {
    const SortbyStt = (e: any) => {
        setSortByStt(e.target.value);
    };

    


    return (
        <div className='pt-2 pb-2'>
            <span className='text-1xl font-bold mb-5 ml-5'> Sort by Status
                <select onChange={SortbyStt} className='border-gray-500 border rounded-1 ml-2 px-2 py-1'>
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="incomplete" >Incomplete</option>
                </select>
            </span>
            
        </div>
    );
}