import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import prisma from "../../prisma/index.js";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const authOptions = {
  // debug: true,
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
};
