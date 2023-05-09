import React, { useState } from "react";
import {
  BookmarkIcon,
  MinusCircleIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { api } from "~/utils/api";
interface PostInput {
  id: string;
  content: string;
  title: string;
  createdAt: Date;
  creator: string;
  tag: string | undefined;
}
const Post = ({ content, title, createdAt, creator, tag, id }: PostInput) => {
  const formatDate = (timestamp: Date) => {
    const date = new Date(timestamp).getDate();
    const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
      timestamp
    );
    const year = new Date(timestamp).getFullYear();
    return `${date} ${month} ${
      year !== new Date(Date.now()).getFullYear() ? year : ""
    }`;
  };

  const calculateReadTime = (contentLength: number) => {
    return Math.ceil(contentLength / 250);
  };
  return (
    <Link className="flex" href={`/post/${id}`} shallow prefetch={false}>
      <div className="mb-10 flex cursor-pointer flex-col border-b border-red-50 border-red-50/20 p-2 pb-5">
        <div className="flex items-center">
          <div className="mr-2 h-6 w-6 rounded-full bg-white" />
          <p className="font-semibold text-white">{`${creator} - `}</p>
          <p className="ml-2 font-medium text-white/70">
            {formatDate(createdAt)}
          </p>
        </div>
        <h1 className="mt-5 font-bold text-white">{title}</h1>
        <p className="mt-3 font-light text-gray-400">
          {`${content
            .replaceAll("*", "")
            .replaceAll("#", "")
            .substring(0, 450)}...`}
        </p>
        <div className="mt-10 flex justify-between">
          <div className="flex items-center justify-center space-x-2">
            <p className="cursor-pointer rounded-lg bg-blue-500/40 px-2 font-light text-white transition-all duration-100 ease-linear hover:scale-105">
              {tag}
            </p>
            <p className="text-xs text-gray-600">{`${calculateReadTime(
              content.split(" ").length
            )} min read`}</p>
            <p className="text-xs font-extralight text-gray-600">
              Selected for you
            </p>
          </div>
          <div className="flex items-center justify-center space-x-5">
            <BookmarkIcon className="h-6 w-6 cursor-pointer text-gray-400 hover:text-white" />

            <MinusCircleIcon className="h-6 w-6 cursor-pointer text-gray-400 hover:text-white" />
            <EllipsisHorizontalIcon className="h-6 w-6 cursor-pointer text-gray-400 hover:text-white" />
          </div>
        </div>
      </div>
      <div className="ml-5 flex w-[15%] items-center justify-center">
        <div className="h-[100px] w-[100px] cursor-pointer rounded-md bg-blue-500/40" />
      </div>
    </Link>
  );
};

export default Post;
