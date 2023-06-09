import { z } from "zod";
import {
  authenticatedProcedure,
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import prisma from "~/db/client";
import { Category, Post, Role, User } from "@prisma/client";
import { BadRequestError, DBConnectionError } from "@giorgosmarga/errors";
import { PostClass } from "~/utils/Post";
import redisClient from "~/db/redisClient";
import type { CommentWithUser } from "~/pages/post/[id]";
export const postsRouter = createTRPCRouter({
  getPosts: publicProcedure.input(z.any()).query(async () => {
    try {
      const posts = await prisma.post.findMany({
        take: 5,
        include: {
          user: {
            select: {
              fullName: true,
            },
          },
        },
      });
      return posts;
    } catch (error) {
      throw new DBConnectionError("DB_ERROR while fetching posts.");
    }
  }),
  getPost: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .query(async ({ input: { id } }) => {
      try {
        const cachedPost = await redisClient.get(id);

        if (cachedPost) {
          return JSON.parse(cachedPost) as Post & {
            user: User;
            comments: CommentWithUser[];
            _count: { likes: number };
          };
        }
      } catch (err) {
        console.log("no redis");
      }

      const post = await PostClass.getPostById(id);
      try {
        await redisClient.set(post.id, JSON.stringify(post), { EX: 60 * 60 });
      } catch (err) {
        console.log(err);
      }
      return post;
    }),
  createPost: authenticatedProcedure
    .input(
      z.object({
        title: z.string().min(2).max(200),
        content: z.string().min(200),
        category: z.string(),
        tags: z.string().array().max(5),
        subtitle: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const post = await prisma.post.create({
        data: {
          title: input.title,
          content: input.content,
          category: Category.TECHNOLOGY,
          tags: input.tags,
          userId: ctx.user.id,
          subtitle: input.subtitle,
        },
      });
      return post;
    }),
  updatePost: authenticatedProcedure
    .input(
      z.object({
        title: z.string().min(2).max(150).optional(),
        content: z.string().min(200).optional(),
        subtitle: z.string().min(5).optional(),
        postId: z.string().uuid(),
      })
    )
    .mutation(async ({ input: { title, content, subtitle, postId }, ctx }) => {
      const post = await PostClass.getPostById(postId);
      await redisClient.del(postId);
      if (ctx.user.id === post.user.id) {
        const updatedPost = await PostClass.updatePost(postId, {
          title,
          content,
          subtitle,
        });
        return updatedPost;
      }
    }),
  deletePost: authenticatedProcedure
    .input(
      z.object({
        postId: z.string().uuid(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const post = await PostClass.getPostById(input.postId);
      if (ctx.user.role === Role.ADMIN || post.user.id === ctx.user.id) {
        const deletedPost = await PostClass.deletePost(input.postId);
        return { ...deletedPost, deletedBy: ctx.user.id, role: ctx.user.role };
      }
      throw new BadRequestError("You are not authorized to delete this post");
    }),
  getUserPosts: authenticatedProcedure
    .input(
      z.object({
        userId: z.string().uuid(),
      })
    )
    .query(async ({ input }) => {
      const posts = await PostClass.getUserPosts(input.userId);
      return posts;
    }),
});
