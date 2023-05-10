import React, { useState } from "react";
import { api } from "~/utils/api";
import type { CommentWithUser } from "~/pages/post/[id]";
const CreateComment = ({
  postId,
  updateComments,
}: {
  postId: string;
  updateComments: (comment: CommentWithUser) => void;
}) => {
  const createComment = api.comment.createComment.useMutation();
  const [content, setContent] = useState("");
  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.currentTarget.value);
  };
  const onClickHandler = async () => {
    const newComment = await createComment.mutateAsync({
      content,
      postId,
    });
    setContent("");
    updateComments(newComment);
  };
  return (
    <div className="mt-5 flex space-x-2 p-1" id="comments">
      <div className="flex">
        <div className="h-7 w-7 rounded-full bg-white" />
      </div>
      <div className="flex flex-grow flex-col">
        <textarea
          value={content}
          placeholder="Add your comment"
          className="h-[100px] max-h-[100px] min-h-[100px] rounded-lg bg-blue-950/50 p-2 text-white shadow-lg outline-none"
          onChange={onChangeHandler}
        />
        {content && (
          <button
            onClick={onClickHandler}
            className="mt-2 w-fit rounded-md bg-blue-600 px-2 py-1 text-white transition-all duration-100 ease-linear hover:scale-105"
          >
            Add Comment
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateComment;
