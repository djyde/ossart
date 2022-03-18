import NextAuth from "next-auth";
import { prisma, singletonSync } from "../../../utils.server";
import { authProviders } from "../../../config.server";
import { PrismaAdapter } from '@next-auth/prisma-adapter'

export type UserSession = {
  user: {
    name: string;
    email: string;
  };
  uid: string;
};

const options = {
  // Configure one or more authentication providers
  providers: authProviders,

  adapter: PrismaAdapter(prisma),

  callbacks: {
  }
};

export default NextAuth(options)
