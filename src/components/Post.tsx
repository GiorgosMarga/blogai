import React from 'react'
import { BookmarkIcon,  MinusCircleIcon, EllipsisHorizontalIcon} from '@heroicons/react/24/outline'
const Post = () => {
  return (
    <div className='flex '>
        <div className='flex cursor-pointer flex-col p-2 border-b border-red-50/20 pb-5 mb-10 border-red-50'>
            <div className='flex items-center'>
                <div className='h-6 w-6 rounded-full bg-white mr-2'/>
                <p className='text-white font-semibold'>Kal -</p>
                <p className='text-white/70 font-medium ml-2'>Jan 20</p>            
            </div>
            <h1 className='text-white font-bold mt-5'>
                Node JS Best Practices - 2023
            </h1>
            <p className='text-gray-400 font-light mt-3'>
            Don’t useJSON.parse and JSON.stringify What? but I have used it for many years and it is very important. Yes I have also used it for many years and it indeed served me well but the problem starts when your...
            </p>
            <div className='flex justify-between mt-10'>
                <div className='flex items-center space-x-2 justify-center'>
                    <p className='bg-blue-500/40 text-white font-light px-2 rounded-lg cursor-pointer hover:scale-105 transition-all ease-linear duration-100'>Node</p>
                    <p className='text-xs text-gray-600'>5 min read</p>
                    <p className='text-xs text-gray-600 font-extralight'>Selected for you</p>
                </div>
                <div className='flex space-x-5 justify-center items-center'>
                    <BookmarkIcon className='w-6 h-6 text-gray-400 cursor-pointer hover:text-white'/>
                    <MinusCircleIcon className='w-6 h-6 text-gray-400 cursor-pointer hover:text-white'/>
                    <EllipsisHorizontalIcon className='w-6 h-6 text-gray-400 cursor-pointer hover:text-white'/>
                </div>
            </div>
        </div>
        <div className='w-[15%] flex ml-5 justify-center items-center'>
            <div className='w-[100px] h-[100px] bg-blue-500/40 cursor-pointer rounded-md'/>
        </div>
    </div>
    
  )
}

export default Post