import { z } from "zod";
import { authenticatedProcedure, createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import prisma from "~/db/client";
import { Post , Category} from "@prisma/client";
import {DBConnectionError} from "@giorgosmarga/errors"

export const postsRouter = createTRPCRouter({
    getPosts: publicProcedure.query(async () => {
        let posts: Post[] | null
        try {
            posts = await prisma.post.findMany({})
        } catch (error) {
            throw new DBConnectionError('DB_ERROR while fetching posts.')
        }
        return posts
    }),
    getPost: publicProcedure.input(z.object({
        id: z.string().uuid()
    })).query(async ({input: {id}}) => {
        let post: Post | null
        try {
            post = await prisma.post.findFirst({
                where: {
                    id
                }
            })
        } catch (error) {
            throw new DBConnectionError('DB_ERROR while fetching post.')
        }
        return post;
    }),
    createPost: authenticatedProcedure.input(z.object({
        title: z.string().min(2).max(50),
        content: z.string().min(200),
        category: z.string(),
        tags: z.string().array().max(5)
    })).mutation(async ({input,ctx}) => {
        const post = await prisma.post.create({
            data: {
                title: input.title,
                content: input.content,
                category: Category.TECHNOLOGY,
                tags: input.tags,
                userId: ctx.user.id
            }
        })
        return post;
    })
})