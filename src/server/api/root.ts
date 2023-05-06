import { createTRPCRouter } from "~/server/api/trpc";
import { usersRouter } from "~/server/api/routers/users"
import { postsRouter } from "./routers/posts";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: usersRouter,
  post: postsRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;