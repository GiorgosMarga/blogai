import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { api } from "~/utils/api";
import MarkdownRenderer from "~/components/MarkdownRenderer";
import {
  PencilIcon,
  BookmarkSlashIcon,
  HandThumbUpIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  BookmarkIcon,
  PlayCircleIcon,
  ShareIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import { useRecoilValue } from "recoil";
import { userAtom } from "~/atoms/userAtom";
import { BarLoader } from "react-spinners";
export const getServerSideProps = (context: GetServerSidePropsContext) => {
  const { id } = context.query;

  return {
    props: {
      id,
    },
  };
};
const Post = ({ id }: { id: string }) => {
  const userId = useRecoilValue(userAtom);
  const post = api.post.getPost.useQuery(
    { id },
    { staleTime: Infinity, refetchOnMount: "always" }
  );
  const bookmarkPost = api.user.bookmarkPost.useMutation();
  const likePost = api.user.likePost.useMutation();
  const updatePost = api.post.updatePost.useMutation();
  const isPostLiked = api.user.isPostLiked.useQuery(
    { postId: id },
    {
      staleTime: Infinity,
      refetchOnMount: "always",
      retry: false,
      cacheTime: 0,
    }
  );
  const isPostBookmarked = api.user.isPostBookmarked.useQuery(
    { postId: id },
    {
      staleTime: Infinity,
      refetchOnMount: "always",
      retry: false,
      cacheTime: 0,
    }
  );
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [editable, setEditable] = useState(false);
  const [edit, setEdit] = useState(false);
  const [content, setContent] = useState("");
  // initialize likes from db
  useEffect(() => {
    if (post.data) {
      setLikes(post.data.likes);
    }
  }, [post.data]);

  useEffect(() => {
    if (userId && post.data && userId === post.data.user.id) {
      setEditable(true);
    }
  }, [userId, post.data]);

  // initialize if post has been already liked before by the user (from db)
  useEffect(() => {
    if (isPostLiked.data) {
      console.log(isPostLiked.data);
      setIsLiked(isPostLiked.data.isLiked);
    }
  }, [isPostLiked.data]);

  useEffect(() => {
    if (isPostBookmarked.data) {
      setIsBookmarked(isPostBookmarked.data);
    }
  }, [isPostBookmarked.data]);

  const likePostHandler = () => {
    if (isLiked) {
      setLikes((prevState) => prevState - 1);
    } else {
      setLikes((prevState) => prevState + 1);
    }
    setIsLiked((prevState) => !prevState);
    likePost.mutate({ postId: id });
  };

  const bookmarkPostHandler = () => {
    setIsBookmarked((prevState) => !prevState);
    bookmarkPost.mutate({ postId: id });
  };

  const onCancelHandler = () => {
    setEdit(false);
  };
  const onUpdateHandler = async () => {
    if (post.data) {
      await updatePost.mutateAsync({
        postId: post.data?.id,
        content,
      });
      setEdit(false);
      post.refetch();
    }
  };

  const onEditHandler = () => {
    setEdit(true);
    if (post.data) {
      setContent(post.data.content);
    }
  };
  return (
    <>
      <Head>
        <title>New Post</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-b from-[#111827] to-[#15162c] px-36 py-10">
        {post.data && (
          <>
            <h1 className="mb-5 mt-16 w-[80%] justify-start text-5xl font-extrabold text-blue-500">
              {post.data.title}
            </h1>
            <h3 className="w-[80%] justify-start text-xl font-semibold text-white">
              {post.data.subtitle}
            </h3>
            <div className="mb-7 mt-5 flex w-[80%] items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-white" />
              <div className="flex flex-col text-gray-400">
                <div className="flex items-center space-x-2">
                  <p className="text-sm">{post.data.user.fullName}</p>
                  <p className="text-sm">·</p>
                  <button className="text-sm text-blue-500">{` Follow`}</button>
                </div>
                <div className="flex items-center space-x-2 text-sm font-light">
                  <p>{`${Math.ceil(
                    post.data.content.split(" ").length / 250
                  )} min read`}</p>
                  <p className="text-lg">·</p>
                  <p>{`${new Date(
                    post.data.createdAt
                  ).getDate()} ${new Intl.DateTimeFormat("en-US", {
                    month: "long",
                  }).format(new Date(post.data.createdAt))} ${new Date(
                    post.data.createdAt
                  ).getFullYear()}`}</p>
                </div>
              </div>
            </div>
            <div className="flex w-[80%] justify-between border-b border-gray-50/20 pb-4 ">
              <div className="flex space-x-5 text-gray-300 ">
                <div className="flex items-center space-x-2">
                  <HandThumbUpIcon
                    className={`h-5 w-5 cursor-pointer transition-all ease-linear hover:scale-105 ${
                      isLiked ? "text-red-400" : "text-gray-300"
                    }`}
                    onClick={likePostHandler}
                  />
                  <p>{(isPostLiked.isFetched || isPostLiked.error) && likes}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5 text-gray-300" />
                  <p>0</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                {editable && (
                  <PencilIcon
                    className="h-5 w-5 cursor-pointer hover:text-white"
                    onClick={onEditHandler}
                  />
                )}
                {isBookmarked ? (
                  <BookmarkSlashIcon
                    className={`h-5 w-5 cursor-pointer hover:text-white`}
                    onClick={bookmarkPostHandler}
                  />
                ) : (
                  <BookmarkIcon
                    className={`h-5 w-5 cursor-pointer hover:text-white`}
                    onClick={bookmarkPostHandler}
                  />
                )}
                <PlayCircleIcon className="h-5 w-5" />
                <ShareIcon className="h-5 w-5" />
                <EllipsisHorizontalIcon className="h-5 w-5" />
              </div>
            </div>
            {!edit && (
              <MarkdownRenderer
                content={post.data.content}
                className="mt-10 w-[80%]"
              />
            )}
            {edit && (
              <>
                <textarea
                  value={content}
                  className="mt-2 h-full max-h-full min-h-[500px] w-full rounded-lg bg-blue-950/50 p-2 text-white shadow-lg outline-none"
                  onChange={(e) => setContent(e.currentTarget.value)}
                />
                <div className="mt-5 flex w-full justify-end space-x-2 ">
                  <button
                    onClick={onCancelHandler}
                    className="rounded-lg bg-red-500 px-4 py-1 text-white"
                  >
                    Cancel
                  </button>
                  {updatePost.isLoading ? (
                    <BarLoader
                      height={5}
                      width={100}
                      color="green"
                      className="mt-3"
                    />
                  ) : (
                    <button
                      onClick={onUpdateHandler}
                      className="rounded-lg bg-green-500 px-4 py-1 text-white"
                    >
                      Submit
                    </button>
                  )}
                </div>
              </>
            )}
            <div className="mt-5 flex w-[80%] space-x-4 border-t border-gray-500/30 py-3 ">
              {post.data.tags.map((tag, index) => {
                return (
                  <div
                    key={index}
                    className="rounded-xl bg-blue-800/60 px-2 py-1 text-gray-400"
                  >
                    {tag}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default Post;
