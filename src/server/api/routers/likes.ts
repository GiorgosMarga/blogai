import { DBConnectionError } from "@giorgosmarga/errors";
import { authenticatedProcedure, createTRPCRouter } from "../trpc";
import { z } from "zod";
import prisma from "~/db/client";
import redisClient from "~/db/redisClient";
export const likesRouter = createTRPCRouter({
  getLikedPosts: authenticatedProcedure
    .input(z.any())
    .query(async ({ ctx }) => {
      try {
        const likedPosts = await prisma.likes.findMany({
          where: {
            userId: ctx.user.id,
          },
        });
        return likedPosts;
      } catch (error) {
        throw new DBConnectionError("DB_ERROR while feetching liked posts.");
      }
    }),
  isPostLiked: authenticatedProcedure
    .input(
      z.object({
        postId: z.string().uuid(),
      })
    )
    .query(async ({ input, ctx }) => {
      try {
        const isPostLiked = await prisma.likes.findUnique({
          where: {
            userId_postId: {
              userId: ctx.user.id,
              postId: input.postId,
            },
          },
        });
        if (!isPostLiked) {
          return { isLiked: false };
        }
        return { isLiked: true };
      } catch (error) {
        throw new DBConnectionError(
          "DB_ERROR while checking if post is liked."
        );
      }
    }),
  likePost: authenticatedProcedure
    .input(z.object({ postId: z.string().uuid() }))
    .mutation(async ({ input, ctx }) => {
      try {
        await prisma.likes
          .create({
            data: {
              userId: ctx.user.id,
              postId: input.postId,
            },
          })
          //for ts error
          .then();
        redisClient.del(input.postId);
        return { msg: "Created" };
      } catch (error) {
        throw new DBConnectionError("DB_ERROR while liking the post");
      }
    }),
  unlikePost: authenticatedProcedure
    .input(
      z.object({
        postId: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await prisma.likes
          .delete({
            where: {
              userId_postId: {
                userId: ctx.user.id,
                postId: input.postId,
              },
            },
          })
          .then(); //for ts error
        redisClient.del(input.postId);

        return { msg: "Deleted" };
      } catch (error) {
        throw new DBConnectionError("DB_ERROR while unliking the post");
      }
    }),
});
