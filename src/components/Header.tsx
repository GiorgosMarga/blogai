import React from 'react'
import {MagnifyingGlassIcon, PencilSquareIcon, BellIcon} from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
const Header = () => {
    const router = useRouter()

    const onClickHandler = async () => {

        if(document.cookie){
            console.log("cookie:",document)
            return await router.push('/newPost')
        }
        await router.push('/auth')
    }
  return (
    <header className='w-full h-16  border-b border-red-50/60 flex items-center justify-between px-7'>
        <div className='flex space-x-5'>
            <h1 className='text-xl font-extrabold text-red-50'>BlogAI</h1>
            <div className='flex rounded-xl w-64 px-2 py-1 space-x-2 bg-[#161f32]'>
                <MagnifyingGlassIcon className='text-red-50 w-5 h-5 mt-[2px]'/>
                <input className='bg-[#161f32] text-red-50 outline-none' placeholder='Search BlogAI'/>
            </div>
        </div>
        <div className='flex space-x-8 justify-center items-center'>
            <div className='flex space-x-1 cursor-pointer' onClick={onClickHandler}>
                <PencilSquareIcon className='text-red-50 w-6 h-6'/>
                <p className='text-red-50'>Write</p>
            </div>
            <BellIcon className='text-red-50 w-6 h-6'/>
            <div className='w-7 h-7 bg-blue-500 rounded-full' />

        </div>
    </header>
  )
}

export default Header