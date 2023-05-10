import React from "react";

const Comment = ({
  content,
  isAuthor,
  creator,
  createdAt,
}: {
  content: string;
  isAuthor: boolean;
  creator: string;
  createdAt: string;
}) => {
  return (
    <div className="mb-5 flex space-x-2 rounded-lg bg-blue-900/10 p-2 text-blue-100">
      <div className="items-start">
        <div className="flex h-8 w-8 rounded-full bg-white" />
      </div>
      <div className="flex flex-col">
        <div className="flex items-center space-x-2">
          <p className="cursor-pointer break-all hover:text-white">
            {creator}
          </p>
          {isAuthor && (
            <div className="rounded-sm bg-blue-900/20 p-1 text-xs font-bold">
              AUTHOR
            </div>
          )}
          <p className="text-sm">·</p>
          <p className="font-light">{createdAt}</p>
        </div>
        <p className="">{content}</p>
        <div className="mt-3 flex items-center space-x-1">
          <p className="cursor-pointer hover:text-white hover:underline">
            Reply
          </p>
          <p className="text-sm">·</p>

          <p className="cursor-pointer hover:text-white hover:underline">
            Edit
          </p>
          <p className="text-sm">·</p>

          <p className="cursor-pointer hover:text-white hover:underline">
            Like
          </p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
