import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { env } from "@/env";
import { db } from "@/server/db";

export const auth = betterAuth({
  rateLimit: {
    window: 20, // time window in seconds
    max: 100, // max requests in the window
  },

  database: prismaAdapter(db, {
    provider: "mongodb", // or "sqlite" or "mysql"
  }),
  emailAndPassword: {
    enabled: false,
  },
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: env.GOOGLE_CLIENT_ID as string,
      clientSecret: env.GOOGLE_CLIENT_SECRET as string,
      scope: [
        //

        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile",
      ],
    },
  },
});

export type Session = typeof auth.$Infer.Session;
