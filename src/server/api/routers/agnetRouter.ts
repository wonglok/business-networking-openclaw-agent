import { z } from 'zod'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '@/server/api/trpc'
import { getID } from '@/server/db'
import { TRPCError } from '@trpc/server'

export const agentRouter = createTRPCRouter({
  // hello: publicProcedure.input(z.object({ text: z.string() })).query(({ input }) => {
  //   return {
  //     greeting: `Hello ${input.text}`,
  //   }
  // }),

  // create: protectedProcedure.input(z.object({ name: z.string().min(1) })).mutation(async ({ ctx, input }) => {
  //   return ctx.db.post.create({
  //     data: {
  //       id: getID(),
  //       name: input.name,
  //       createdBy: { connect: { id: ctx.session.user.id } },
  //     },
  //   })
  // }),

  claimBot: protectedProcedure
    .input(
      z.object({
        //
        claimId: z.string(),
        verificationCode: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const agentSecret = await ctx.db.agentSecret.findFirstOrThrow({
        orderBy: { createdAt: 'desc' },
        where: {
          claimToken: input.claimId,
          verificationCode: input.verificationCode,
        },
      })

      const userId = ctx.session.user.id

      const agentObject = await ctx.db.agentObject.findFirstOrThrow({
        where: {
          id: agentSecret?.agentObjectId,
        },
      })

      if (agentObject.claimStatus === 'claimed') {
        throw new TRPCError({
          message: 'Bot is already claimed',
          code: 'FORBIDDEN',
        })
      }

      if (agentObject.userId) {
        throw new TRPCError({
          message: 'Bot is already claimed',
          code: 'FORBIDDEN',
        })
      }

      await ctx.db.agentObject.update({
        where: {
          id: agentSecret?.agentObjectId,
        },
        data: {
          //
          claimStatus: `claimed`,
          userId: userId,
          //
        },
      })

      console.log(agentSecret)

      return { ok: true }
    }),

  checkClaimStatusOfCode: protectedProcedure
    .input(
      z.object({
        //
        claimId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const agentSecret = await ctx.db.agentSecret.findFirstOrThrow({
        orderBy: { createdAt: 'desc' },
        where: { claimToken: input.claimId },
      })

      const agentObject = await ctx.db.agentObject.findFirstOrThrow({
        where: {
          id: agentSecret?.agentObjectId,
        },
      })

      return agentObject.claimStatus
    }),

  // getSecretMessage: protectedProcedure.query(() => {
  //   return 'you can now see this secret message!'
  // }),
})
