import { z } from "zod";
import {
  authenticatedProcedure,
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import prisma from "~/db/client";
import type { User } from "@prisma/client";
import {
  DBConnectionError,
  UnauthorizedError,
  BadRequestError,
} from "@giorgosmarga/errors";
import { UserClass } from "~/utils/User";
import jsonwebtoken from "jsonwebtoken";
import { env } from "~/env.mjs";
import { JWT } from "~/utils/JWT";

export const usersRouter = createTRPCRouter({
  getUser: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .query(async ({ input }) => {
      const user = await UserClass.fetchUserById(input.id);
      return user;
    }),
  getUsers: publicProcedure.query(async () => {
    let users: User[] | null;
    try {
      users = await prisma.user.findMany({});
    } catch (error) {
      throw new DBConnectionError("DB_ERROR");
    }
    return users;
  }),
  logoutUser: authenticatedProcedure.mutation(({ ctx }) => {
    console.log("CREATED COOKIE");

    ctx.res.setHeader(
      "Set-Cookie",
      `user=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;`
    );
    return;
  }),
  registerUser: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(6),
        fullName: z.string().min(3),
      })
    )
    .mutation(async ({ input: { email, password, fullName }, ctx }) => {
      const user = await UserClass.createUser({ email, password, fullName });
      const jwt = jsonwebtoken.sign(
        { email: user.email, id: user.id, role: user.role },
        env.JWT_KEY
      );
      console.log("CREATED COOKIE");

      ctx.res.setHeader("Set-Cookie", `user=${jwt}; path=/;`);
      return user;
    }),
  setAdmin: authenticatedProcedure
    .input(
      z.object({
        userId: z.string().uuid(),
      })
    )
    .mutation(async ({ input }) => {
      const user = await prisma.user.update({
        where: {
          id: input.userId,
        },
        data: {
          role: "ADMIN",
        },
      });
      return user;
    }),
  loginUser: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({ input: { email, password }, ctx }) => {
      const user = await UserClass.loginUser({ email, password });
      const jwt = JWT.createJWT({
        email: user.email,
        id: user.id,
        role: user.role,
      });
      console.log("CREATED COOKIE");
      ctx.res.setHeader("Set-Cookie", `user=${jwt}; path=/;`);
      return user;
    }),
  deleteUser: authenticatedProcedure
    .input(
      z.object({
        email: z.string().email(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.user.role === "ADMIN" || ctx.user.email === input.email) {
        const deletedeUser = await UserClass.deleteUser(input.email);
        return deletedeUser;
      }
      throw new UnauthorizedError();
    }),
  sendVerificationEmail: authenticatedProcedure.mutation(async ({ ctx }) => {
    const user = await UserClass.fetchUserById(ctx.user.id);
    if (user.isVerified) {
      throw new BadRequestError("User is already verified");
    }
    const code = await UserClass.setVerificationCode(user.email);
    user.verificationId = code; // so it can be used in the next static func
    await UserClass.sendVerificationEmail(user);

    return;
  }),
  verifyAccount: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        verificationId: z.string().length(40),
      })
    )
    .mutation(async ({ input }) => {
      const user = await UserClass.fetchUserById(input.id);

      if (
        user.verificationId === input.verificationId &&
        user.verificationIdTimestamp > new Date(Date.now())
      ) {
        try {
          const newUser = await prisma.user.update({
            where: {
              id: input.id,
            },
            data: {
              isVerified: true,
              verificationId: "",
              verificationIdTimestamp: new Date(Date.now()),
            },
          });
          return newUser;
        } catch (error) {
          throw new DBConnectionError("DB_ERROR while verifying user.");
        }
      }
      throw new BadRequestError("User was not verified.");
    }),
  bookmarkPost: authenticatedProcedure
    .input(
      z.object({
        postId: z.string().uuid(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const user = await UserClass.fetchUserById(ctx.user.id);
      let updatedUser: User;
      try {
        updatedUser = await prisma.user.update({
          where: {
            id: ctx.user.id,
          },
          data: {
            bookmarked: user.bookmarked.includes(input.postId)
              ? user.bookmarked.filter((postId) => postId !== input.postId)
              : [...user.bookmarked, input.postId],
          },
        });
        return updatedUser.bookmarked;
      } catch (error) {
        throw new DBConnectionError("DB_ERROR while updating bookmarked.");
      }
    }),

  isPostBookmarked: authenticatedProcedure
    .input(
      z.object({
        postId: z.string().uuid(),
      })
    )
    .query(async ({ input, ctx }) => {
      const user = await UserClass.fetchUserById(ctx.user.id);
      return user.bookmarked.includes(input.postId);
    }),
  whoIs: authenticatedProcedure.input(z.any()).query(({ ctx }) => {
    // let user: {id: string, bookmarked: string[]} | null
    // try {
    //   user = await prisma.user.findFirst({
    //     where: {
    //       id: ctx.user.id
    //     },
    //     select: {
    //       id: true,
    //       bookmarked: true
    //     }
    //   })
    // } catch (error) {
    //   throw new TRPCError({code: "INTERNAL_SERVER_ERROR", message: "DB_ERROR while fetching user"})
    // }
    // if(!user){
    //   throw new TRPCError({code: "NOT_FOUND", message: "User does not exist"})
    // }
    return {
      id: ctx.user.id,
    };
  }),
});
