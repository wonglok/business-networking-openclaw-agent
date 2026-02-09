import { z } from 'zod'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '@/server/api/trpc'
import { getID } from '@/server/db'
import { TRPCError } from '@trpc/server'
// import { BusinessAgentAuth } from '@/app/openclaw/api/v1/_core/BusinessAgentAuth'

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

  listMyBots: protectedProcedure
    .input(
      z.object({
        //
      }),
    )
    .query(async ({ ctx, input }) => {
      //

      const agent = await ctx.db.agentObject.findMany({
        where: {
          userId: `${ctx.session.user.id}`,
        },
        orderBy: {
          createdAt: 'desc',
        },
      })

      return agent
    }),

  listBotInbox: protectedProcedure
    .input(
      z.object({
        //
        agentId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      //

      const agent = await ctx.db.agentObject.findFirstOrThrow({
        where: {
          id: input.agentId,
          userId: `${ctx.session.user.id}`,
        },
        orderBy: {
          createdAt: 'desc',
        },
      })

      const msgs = await ctx.db.agentMessage.findMany({
        where: {
          toAgentObjectId: agent.id,
        },
      })

      return msgs
    }),

  listBotOutbox: protectedProcedure
    .input(
      z.object({
        //
        agentId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      //

      const agent = await ctx.db.agentObject.findFirstOrThrow({
        where: {
          id: input.agentId,
          userId: `${ctx.session.user.id}`,
        },
        orderBy: {
          createdAt: 'desc',
        },
      })

      const msgs = await ctx.db.agentMessage.findMany({
        where: {
          fromAgentObjectId: agent.id,
        },
      })

      return msgs
    }),

  getTokenOfMyBot: protectedProcedure
    .input(
      z.object({
        agentId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      //
      const agent = await ctx.db.agentObject.findFirstOrThrow({
        where: {
          id: input.agentId,
          userId: ctx.session.user.id,
        },
      })

      console.log(agent)

      const agentSecret = await ctx.db.agentSecret.findFirstOrThrow({
        where: {
          agentObjectId: agent.id,
        },
      })

      return {
        claimID: agentSecret.claimToken,
        verifyCode: agentSecret.verificationCode,
        // token: agentSecret.apiKey,
      }
    }),
  //

  updateBotUI: protectedProcedure
    .input(
      z.object({
        agentId: z.string(),
        //
        name: z.string(),
        description: z.string(),
        //
      }),
    )
    .mutation(async ({ ctx, input }) => {
      //
      const agent = await ctx.db.agentObject.findFirstOrThrow({
        where: {
          id: input.agentId,
          userId: ctx.session.user.id,
        },
      })

      console.log(agent)

      await ctx.db.agentObject.update({
        where: {
          id: agent.id,
        },
        data: {
          name: input.name,
          description: input.description,
        },
      })

      //

      return {
        ok: true,
      }
    }),

  // registerBotUI: protectedProcedure
  //   .input(
  //     z.object({
  //       //
  //       name: z.string(),
  //       description: z.string(),
  //       //
  //     }),
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     const auth = new BusinessAgentAuth({
  //       tokenPrefix: `openclaw_business_agent_`,
  //       claimPrefix: `openclaw_business_agent_claim_`,
  //     })

  //     const token = auth.generateApiKey()
  //     const claimToken = auth.generateClaimToken()
  //     const verificationCode = auth.generateVerificationCode()

  //     const agentObjId = getID()

  //     const agent = await ctx.db.agentObject.create({
  //       data: {
  //         id: agentObjId,
  //         userId: ctx.session.user.id,

  //         botStatus: 'not-connected',
  //         name: input.name,
  //         description: input.description,
  //       },
  //     })

  //     const agentSecret = await ctx.db.agentSecret.create({
  //       data: {
  //         id: getID(),

  //         //
  //         agentObjectId: agentObjId,
  //         apiKey: token,

  //         claimToken: claimToken,
  //         verificationCode: verificationCode,
  //       },
  //     })
  //     return {
  //       //
  //       companyID: agentObjId,
  //       token: agentObjId,
  //     }
  //   }),

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

      if (agentObject.botStatus === 'activated') {
        throw new TRPCError({
          message: 'Bot is already activated',
          code: 'FORBIDDEN',
        })
      }

      if (agentObject.userId) {
        throw new TRPCError({
          message: 'Bot is already activated',
          code: 'FORBIDDEN',
        })
      }

      await ctx.db.agentObject.update({
        where: {
          id: agentSecret?.agentObjectId,
        },
        data: {
          //
          botStatus: `activated`,
          userId: userId,
          //
        },
      })

      console.log(agentSecret)

      return { ok: true }
    }),

  checkbotStatusOfCode: protectedProcedure
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

      return agentObject.botStatus
    }),

  // getSecretMessage: protectedProcedure.query(() => {
  //   return 'you can now see this secret message!'
  // }),
})
