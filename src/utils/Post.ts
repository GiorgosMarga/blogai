import { Post } from "@prisma/client";
import prisma from "~/db/client";
import { NotFoundError, DBConnectionError } from "@giorgosmarga/errors";
export class PostClass {
    static async getPostById(id: string) {
        try {
            const post = await prisma.post.findFirst({where:{id}, include: {user: true}})
            if(!post){
                throw new NotFoundError('Post was not found.')
            }
            return post;
        } catch (error) {
            throw new DBConnectionError("DB_ERROR while fetching post by id.")
        }
    }
    static async getUserPosts(userId: string): Promise<Post[]> {
        try{
            const posts = await prisma.post.findMany({
                where: {
                    userId
                }
            })
            return posts;
        }catch(err){
            throw new DBConnectionError("DB_ERROR while fetching user posts.")
        }
    }
    static async updatePost(id: string, updatedInput: {title?:string;subtitle?: string,content?: string}): Promise<Post>{
        try {
            const post = await prisma.post.update({
                where: {
                    id
                },
                data: {...updatedInput, updatedAt: new Date(Date.now()) }
            })
            return post;
        } catch (error) {
            throw new DBConnectionError("DB_ERROR while updating post.")
        }
    }
    static async deletePost(id: string): Promise<Post>{
        try {
            const post = await prisma.post.delete({
                where: {
                    id
                },
            })
            return post;
        } catch (error) {
            throw new DBConnectionError("DB_ERROR while deleting post.")
        }
    }
}