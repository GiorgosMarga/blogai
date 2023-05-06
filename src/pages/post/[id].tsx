import type { GetServerSideProps, GetServerSidePropsContext} from 'next'
import React, { useEffect, useState } from 'react'
import Head from 'next/head';
import { api } from '~/utils/api'
import MarkdownRenderer from '~/components/MarkdownRenderer';
import { BookmarkSlashIcon,HandThumbUpIcon,ChatBubbleOvalLeftEllipsisIcon , BookmarkIcon,PlayCircleIcon,ShareIcon,EllipsisHorizontalIcon} from '@heroicons/react/24/outline';

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  const {id} = context.query
  
  return {
    props: {
      id,
    }
  }
  
}
const Post = ({id}:{id:string}) => {

    const post = api.post.getPost.useQuery({id},{staleTime: Infinity, refetchOnMount: 'always'})
    const bookmarkPost = api.user.bookmarkPost.useMutation()
    const likePost = api.user.likePost.useMutation()
    const isPostLiked = api.user.isPostLiked.useQuery({postId: id},{staleTime: Infinity, refetchOnMount: 'always', retry: false, cacheTime: 0})
    const isPostBookmarked = api.user.isPostBookmarked.useQuery({postId: id},{staleTime:Infinity, refetchOnMount: 'always', retry: false, cacheTime: 0})
    const [likes,setLikes] = useState(0)
    const [isLiked,setIsLiked] = useState(false)
    const [isBookmarked,setIsBookmarked] = useState(false)
    
    // initialize likes from db
    useEffect(()=> {
      if(post.data){
        setLikes(post.data.likes)
      }
    }, [post.data])

    // initialize if post has been already liked before by the user (from db)
    useEffect(() => {
      if(isPostLiked.data){
        console.log(isPostLiked.data)
        setIsLiked(isPostLiked.data.isLiked)
      }

    },[isPostLiked.data])

    useEffect(() => {
      if(isPostBookmarked.data){
        setIsBookmarked(isPostBookmarked.data)
      }
    },[isPostBookmarked.data])

    const likePostHandler = () => {
      if(isLiked){
        setLikes((prevState) => prevState - 1)
      }else {
        setLikes((prevState) => prevState + 1)
      }
      setIsLiked((prevState) => !prevState)
      likePost.mutate({postId: id})
    }

    const bookmarkPostHandler = () => {
      setIsBookmarked(prevState => !prevState)
      bookmarkPost.mutate({postId: id})
    }


    return (
        <>
          <Head>
            <title>New Post</title>
            <meta name="description" content="Generated by create-t3-app" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <main className="flex py-10 px-36 min-h-screen flex-col justify-start items-center bg-gradient-to-b from-[#111827] to-[#15162c]">
            
            {post.data && <>
                            <h1 className='text-5xl font-extrabold text-blue-500 justify-start w-[80%] mt-16 mb-5'>{post.data.title}</h1>
                            <h3 className='text-xl font-semibold justify-start w-[80%] text-white'>{post.data.subtitle}</h3>
                            <div className='flex w-[80%] items-center space-x-3 mt-5 mb-7'>
                              <div className='w-10 h-10 rounded-full bg-white'/>
                              <div className='flex flex-col text-gray-400'>
                                <div className='flex items-center space-x-2'>
                                  <p className='text-sm'>{post.data.user.fullName}</p>
                                  <p className='text-sm'>·</p>
                                  <button className='text-sm text-blue-500'>{` Follow`}</button>
                                </div>
                                <div className='flex text-sm font-light space-x-2 items-center'>
                                  <p>{`${Math.ceil(post.data.content.split(' ').length / 250)} min read`}</p>
                                  <p className='text-lg'>·</p>
                                  <p>{`${new Date(post.data.createdAt).getDate()} ${new Intl.DateTimeFormat('en-US', {month: 'long'}).format(new Date(post.data.createdAt))} ${new Date(post.data.createdAt).getFullYear()}`}</p>
                                </div>
                              </div>
                            </div>
                            <div className='flex w-[80%] justify-between border-b border-gray-50/20 pb-4 '>
                                <div className='flex space-x-5 text-gray-300 '>
                                  <div className='flex space-x-2 items-center'>
                                      <HandThumbUpIcon className={`w-5 h-5 hover:scale-105 transition-all ease-linear cursor-pointer ${isLiked ? "text-red-400" : 'text-gray-300'}`} onClick={likePostHandler}/>
                                      <p>{(isPostLiked.isFetched || isPostLiked.error) && likes}</p>
                                  </div>
                                  <div className='flex space-x-2 items-center'>
                                      <ChatBubbleOvalLeftEllipsisIcon className='w-5 h-5 text-gray-300'/>
                                      <p>0</p>
                                  </div>
                                </div>
                                <div className='flex items-center space-x-3 text-gray-400'>
                                    {isBookmarked ? <BookmarkSlashIcon className={`w-5 h-5 hover:text-white cursor-pointer`} onClick={bookmarkPostHandler}/> :<BookmarkIcon className={`w-5 h-5 hover:text-white cursor-pointer`} onClick={bookmarkPostHandler}/>}
                                    <PlayCircleIcon className='w-5 h-5'/>
                                    <ShareIcon className='w-5 h-5'/>
                                    <EllipsisHorizontalIcon className='w-5 h-5'/>
                                </div>
                            </div>
                            <MarkdownRenderer content={post.data.content} className='mt-10 w-[80%]'/>
                            <div className='flex w-[80%] space-x-4 py-3 mt-5 border-t border-gray-500/30 '>
                              {post.data.tags.map((tag,index) => {
                                return <div key={index} className='px-2 py-1 bg-blue-800/60 rounded-xl text-gray-400'>{tag}</div>
                              })}
                            </div>
                          </>}
          </main>
        </>
      );
}

export default Post