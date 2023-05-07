import React from 'react'
import { BookmarkIcon,  MinusCircleIcon, EllipsisHorizontalIcon} from '@heroicons/react/24/outline'
import Link from 'next/link';
interface PostInput {
    id: string;
    content: string;
    title:string;
    createdAt: Date;
    creator: string;
    tag: string|undefined;
}
const Post = ({content,title,createdAt,creator,tag,id}:PostInput) => {
    // const router = useRouter()

    const formatDate = (timestamp: Date) => {
        const date = new Date(timestamp).getDate();
        const month = new Intl.DateTimeFormat('en-US',{month:'long'}).format(timestamp)
        const year = new Date(timestamp).getFullYear()
        return `${date} ${month} ${(year !== new Date(Date.now()).getFullYear()) ? year : ""}`
    }

    const calculateReadTime = (contentLength: number) => {
        return Math.ceil(contentLength / 250)
    }
  return (
    <Link className='flex'  href={`/post/${id}`}  shallow prefetch={false}>
        <div className='flex cursor-pointer flex-col p-2 border-b border-red-50/20 pb-5 mb-10 border-red-50'>
            <div className='flex items-center'>
                <div className='h-6 w-6 rounded-full bg-white mr-2'/>
                <p className='text-white font-semibold'>{`${creator} - `}</p>
                <p className='text-white/70 font-medium ml-2'>{formatDate(createdAt)}</p>            
            </div>
            <h1 className='text-white font-bold mt-5'>
                {title}
            </h1>
            <p className='text-gray-400 font-light mt-3'>
            {`${content.replaceAll("*","").replaceAll("#","").substring(0,450)}...`}
            </p>
            <div className='flex justify-between mt-10'>
                <div className='flex items-center space-x-2 justify-center'>
                    <p className='bg-blue-500/40 text-white font-light px-2 rounded-lg cursor-pointer hover:scale-105 transition-all ease-linear duration-100'>{tag}</p>
                    <p className='text-xs text-gray-600'>{`${calculateReadTime(content.split(' ').length)} min read`}</p>
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
    </Link>
    
  )
}

export default Post