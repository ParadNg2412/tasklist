import React, { useState } from 'react';

export default function SortbyStt({setSortByStt}) {
    const SortbyStt = (e) => {
        setSortByStt(e.target.value);
    };



    return (
        <div className='pt-2 pb-2'>
            <span className='text-1xl font-bold mb-5 ml-5'> Sort by Status
                <select onChange={SortbyStt} className='border rounded-1 ml-2 px-2'>
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="incomplete" >Incomplete</option>
                </select>
            </span>
            
        </div>
    );
}