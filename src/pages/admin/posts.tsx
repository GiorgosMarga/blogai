import React from "react";
import { api } from "~/utils/api";
import type { Post } from "@prisma/client";

const Users = () => {
  const posts = api.post.getPosts.useQuery({});
  const deletedPost = api.post.deletePost.useMutation();
  const onDeleteHandler = async (post: Post) => {
    deletedPost.mutate({ postId: post.id });
    await posts.refetch();
  };
  return (
    <div className="flex flex-col space-y-5">
      <p>Email Id Full Name Bookmarked Role</p>
      {posts.data &&
        posts.data.map((post, index) => {
          return (
            <div
              key={index}
              className="flex space-x-5"
              onClick={async () => await onDeleteHandler(post)}
            >
              <p>{post.id}</p>
              <p>{post.title}</p>
              <p>{post.subtitle}</p>
            </div>
          );
        })}
    </div>
  );
};

export default Users;
