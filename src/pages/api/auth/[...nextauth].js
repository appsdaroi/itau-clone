import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/signin',
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const dbUser = await prisma.user.findFirst({
          where: {
            AND: [
              {
                name: credentials.username,
              },
              {
                password: credentials.password,
              },
            ],
          },
        });

        console.log(dbUser);

        if (dbUser) return dbUser;

        return null;
      },
      callbacks: {
        jwt: async ({ token, user }) => {
          if (user) {
            token.id = user.id;
            token.username = user.username;
          }

          return token;
        },
        session: async ({ session, token }) => {
          if (token) {
            session.id = token.id;
          }

          return session;
        },
      },
    }),
  ],
});
