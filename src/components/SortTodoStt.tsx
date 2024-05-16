import React, { useState } from 'react';

export default function SortbyStt({setSortByStt}) {
    const SortbyStt = (e: any) => {
        setSortByStt(e.target.value);
    };

    


    return (
        <div className='pt-2 pb-2'>
            <span className='text-gray-700 text-1xl font-bold mb-5 ml-5'> Sort by Status</span>
            <select onChange={SortbyStt} className='border-gray-500 border font-bold rounded-1 ml-2 px-2 py-1'>
                <option value="all" className='font-bold'>All</option>
                <option value="completed" className='font-bold text-green-500'>Completed</option>
                <option value="incomplete" className='font-bold text-red-500'>Incomplete</option>
            </select>           
        </div>
    );
}