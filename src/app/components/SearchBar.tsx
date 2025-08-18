import React from 'react'
import { Search } from 'lucide-react'

const SearchBar = () => {
  return (
    <div className='flex items-center rounded-md ring-1 p-2  w-full max-w-md'>
      <Search className=' w-4 h-4' />
      <input
       type="text"
         placeholder="Search products..."
         className="ml-2 p-2 focus:ring-1 rounded-md "
    /> 
    
    </div>
  )
}

export default SearchBar
