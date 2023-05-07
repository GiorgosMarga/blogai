import React from 'react'
import { BookmarkIcon,MinusCircleIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline'
const LoadingPost = () => {
  return (
    <div className='flex animate-pulse '>
        <div className='flex flex-col w-full p-2 border-b border-red-50/20 pb-5 mb-10 border-red-50'>
            <div className='flex items-center h-2 space-x-4'>
                <div className='h-6 w-6 rounded-full bg-gray-500/60 mr-2'/>  
                <p className='text-white font-semibold bg-gray-500/60 w-20 rounded-lg h-2'/>
                <p className='text-white/70 font-medium ml-2 bg-gray-500/60 rounded-lg w-20 h-2'/>       
            </div>
            <h1 className='text-white font-bold mt-8  bg-gray-500/60 rounded-full w-52 h-2'/>
    
            <p className='bg-gray-500/60 rounded-lg w-full h-2 font-light mt-3'/>
            <p className='bg-gray-500/60 rounded-lg w-full h-2 font-light mt-3'/>
            <p className='bg-gray-500/60 rounded-lg w-full h-2 font-light mt-3'/>
            <p className='bg-gray-500/60 rounded-lg w-[80%] h-2 font-light mt-3'/>
            <p className='bg-gray-500/60 rounded-lg w-[60%] h-2 font-light mt-3'/>
                
            
            <div className='flex justify-between mt-10'>
                <div className='flex items-center space-x-2 justify-center'>
                    <p className='bg-blue-500/40 text-white font-light px-2 rounded-lg cursor-pointer hover:scale-105 transition-all ease-linear duration-100 w-20 h-6'></p>
                    {/* <p className='text-xs text-gray-600'>{`${calculateReadTime(content.split(' ').length)} min read`}</p> */}
                    <p className='text-xs text-gray-600 font-extralight'>Selected for you</p>
                </div>
                <div className='flex space-x-5 justify-center items-center'>
                    <BookmarkIcon className='w-6 h-6 text-gray-400 '/>
                    <MinusCircleIcon className='w-6 h-6 text-gray-400 '/>
                    <EllipsisHorizontalIcon className='w-6 h-6 text-gray-400 '/>
                </div>
            </div>
        </div>
        <div className='w-[15%] flex ml-5 justify-center items-center'>
            <div className='w-[100px] h-[100px] bg-blue-500/40 cursor-pointer rounded-md'/>
        </div>
    </div>
    
  )
}

export default LoadingPost