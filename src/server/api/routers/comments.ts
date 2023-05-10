import { authenticatedProcedure, createTRPCRouter } from "../trpc";
import prisma from "~/db/client";
import {z} from 'zod'
import { TRPCError } from "@trpc/server";
import { DBConnectionError } from "@giorgosmarga/errors";
import redisClient from "~/db/redisClient";
import type { Comment, Post } from "@prisma/client";

interface CommentWithCreator  extends Comment{
    creator: {
        fullName: string
    }
}


export const commentsRouter = createTRPCRouter({
    getComment: authenticatedProcedure.input(z.object({
        commentId: z.string().uuid()
    })).query(async ({input}) => {
        
        try  {
            const comment = await prisma.comment.findFirst({where: {id: input.commentId}})    
            if(!comment){
                throw new TRPCError({message: "Post was not found", code: "NOT_FOUND"})
            }
            return comment
        } catch (error) {
            throw new DBConnectionError('DB_ERROR while fetching comment')
        }
    }),
    createComment: authenticatedProcedure.input(z.object({
        postId: z.string().uuid(),
        content: z.string()
    })).mutation(async ({input,ctx}) => {
        try {
            const comment = await prisma.comment.create({
                data: {
                    content: input.content,
                    creatorId: ctx.user.id,
                    postId: input.postId
                },
                include: {
                    creator: {
                        select: {
                            fullName: true
                        }
                    }
                }
            }) 
            const isPostCached = await redisClient.get(input.postId)
            if(isPostCached){
                // if the post is cached we need to update it 
                const post = JSON.parse(isPostCached) as (Post & {comments: CommentWithCreator[]})
                post.comments.push(comment)
                await redisClient.set(post.id, JSON.stringify(post))
            }
            return comment
        } catch (error) {
            throw new DBConnectionError('DB_ERROR while creating comment')
        }   
    }),
    
})