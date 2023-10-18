"use client"

import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useRef } from 'react'

const Searchbar = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const handleSearch = (event: FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        router.push(`/search/${inputRef.current?.value}`)
    }

  return (
    <div className='flex flex-1 justify-center'>
        <form className='flex flex-1 justify-center items-center max-w-[60vw] h-[40px] md:h-[50px]' onSubmit={handleSearch}>
        <input
            ref={inputRef}
            type="text"
            placeholder="Search Images" 
            className="input w-full bg-base-100 rounded-r-none rounded-l-md max-w-lg border-none outline-none text-sm h-full text-base-content" 
        />
        <button className='btn bg-base-100 rounded-l-none rounded-r-md min-h-[40px] max-h-[60px] h-full' type='submit'>
            <Search className='h-4 w-4'/>
        </button>    
        </form>
    </div>
  )
}

export default Searchbar