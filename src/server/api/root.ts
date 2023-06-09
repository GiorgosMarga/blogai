import { createTRPCRouter } from "~/server/api/trpc";
import { usersRouter } from "~/server/api/routers/users";
import { postsRouter } from "./routers/posts";
import { commentsRouter } from "./routers/comments";
import { likesRouter } from "./routers/likes";
import { bookmarkRouter } from "./routers/bookmarks";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: usersRouter,
  post: postsRouter,
  comment: commentsRouter,
  like: likesRouter,
  bookmark: bookmarkRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
