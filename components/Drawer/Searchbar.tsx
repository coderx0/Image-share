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
        <form className='flex flex-1 justify-center' onSubmit={handleSearch}>
        <input
            ref={inputRef}
            type="text"
            placeholder="Search Images" 
            className="input w-full bg-base-100 rounded-r-none rounded-l-md max-w-lg border-none outline-none" 
        />
        <button className='btn bg-base-100 rounded-l-none rounded-r-md' type='submit'>
            <Search/>
        </button>    
        </form>
    </div>
  )
}

export default Searchbar