import { PrismaClient } from '@prisma/client'
import { env } from '~/env.mjs'

const globalForPrisma = global as unknown as {prisma: PrismaClient}

const prisma = globalForPrisma.prisma || new PrismaClient()
export default prisma


if (env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma