import React from 'react'

const PickedArticle = () => {
  return (
    <div className='flex flex-col mt-5 mb-2 cursor-pointer'>
        <div className='flex justify-start items-center'>
            <div className='h-6 w-6 min-h-[24px] min-w-[24px] bg-white rounded-full'/>
            <p className='text-red-50 md:text-sm font-semibold ml-2 text-xs'>BlogAI Staff</p>
            <p className='text-gray-400 md:text-sm text-xs font-semibold mx-1'> in </p>
            <p className='text-red-50 md:text-sm text-xs font-semibold'>Nodejs</p>
        </div>
        <h2  className='text-white font-bold text-lg mt-1'>Nuance over monolithic narratives</h2>
    </div>
  )
}

export default PickedArticle