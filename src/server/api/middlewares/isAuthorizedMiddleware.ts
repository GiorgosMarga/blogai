import { TRPCError } from "@trpc/server";
import { isAuthed } from "../trpc";
export const isAuthorized = isAuthed.unstable_pipe(({next , ctx}) => {
    if(ctx.user.role === 'USER'){
        throw new TRPCError({
            code: "FORBIDDEN"
        })
    }
    return next();
})
  