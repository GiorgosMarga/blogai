import React from "react";

const Comment = () => {
  return (
    <div className="flex space-x-2 text-blue-100 ">
      <div className="items-start">
        <div className="flex h-8 w-8 rounded-full bg-white" />
      </div>
      <div className="flex flex-col">
        <div className="flex items-center space-x-2">
          <p className="cursor-pointer hover:text-white">Giorgos Margaritis</p>
          <div className="rounded-sm bg-blue-900/20 p-1 text-xs font-bold">
            AUTHOR
          </div>
          <p className="font-light">May 5, 2023</p>
        </div>
        <p className="mt-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <div className="mt-1 flex space-x-2">
          <p className="cursor-pointer hover:text-white hover:underline">
            Reply
          </p>
          <p className="cursor-pointer hover:text-white hover:underline">
            Edit
          </p>
          <p className="cursor-pointer hover:text-white hover:underline">
            Like
          </p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
