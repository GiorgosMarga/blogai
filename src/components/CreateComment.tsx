import React from "react";

const CreateComment = () => {
  return (
    <div className="mt-5 flex space-x-2 p-1" id="comments">
      <div className="flex">
        <div className="h-7 w-7 rounded-full bg-white" />
      </div>
      <div className="flex flex-grow flex-col">
        <textarea className="h-[100px] max-h-[100px] min-h-[100px] rounded-lg bg-blue-950/50 p-2 text-white shadow-lg outline-none" />
        <button className="mt-2 w-fit rounded-md bg-blue-600 px-2 py-1 text-white transition-all duration-100 ease-linear hover:scale-105">
          Add Comment
        </button>
      </div>
    </div>
  );
};

export default CreateComment;
