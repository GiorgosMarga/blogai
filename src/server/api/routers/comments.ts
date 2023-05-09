import { authenticatedProcedure, createTRPCRouter } from "../trpc";
import prisma from "~/db/client";
import {z} from 'zod'
import { TRPCError } from "@trpc/server";
import { DBConnectionError } from "@giorgosmarga/errors";
import { Post } from "@prisma/client";
export const commentsRouter = createTRPCRouter({
    getComment: authenticatedProcedure.input(z.object({
        commentId: z.string().uuid()
    })).query(({input}) => {
        
        try  {
            const comment = prisma.comment.findFirst({where: {id: input.commentId}})    
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
                }
            }) 
            return comment
        } catch (error) {
            throw new DBConnectionError('DB_ERROR while creating comment')
        }   
    }),
    
})