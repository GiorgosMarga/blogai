import prisma from "~/db/client";
import {
  authenticatedProcedure,
  createTRPCRouter,
  publicProcedure,
} from "../trpc";
import { z } from "zod";
import { DBConnectionError } from "@giorgosmarga/errors";
export const bookmarkRouter = createTRPCRouter({
  bookmarkPost: authenticatedProcedure
    .input(
      z.object({
        postId: z.string().uuid(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const isPostbookmarked = await prisma.bookmarkedPosts.findUnique({
          where: {
            userId_postId: {
              userId: ctx.user.id,
              postId: input.postId,
            },
          },
        });
        if (isPostbookmarked) {
          await prisma.bookmarkedPosts.delete({
            where: {
              userId_postId: {
                userId: ctx.user.id,
                postId: input.postId,
              },
            },
          });
          return { bookmark: false };
        }
        const bookmarkedPost = await prisma.bookmarkedPosts.create({
          data: {
            postId: input.postId,
            userId: ctx.user.id,
          },
        });
        return { bookmark: true };
      } catch (error) {
        throw new DBConnectionError("DB_ERROR while bookmarking the post.");
      }
    }),

  isPostbookmarked: authenticatedProcedure
    .input(
      z.object({
        postId: z.string().uuid(),
      })
    )
    .query(async ({ input, ctx }) => {
      try {
        const bookmarkedPost = await prisma.bookmarkedPosts.findUnique({
          where: {
            userId_postId: {
              postId: input.postId,
              userId: ctx.user.id,
            },
          },
        });
        return bookmarkedPost
          ? { isBookmarked: true }
          : { isBookmarked: false };
      } catch (error) {
        throw new DBConnectionError("DB_ERROR while removing bookmark.");
      }
    }),
});
