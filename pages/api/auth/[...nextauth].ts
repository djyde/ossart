import NextAuth from "next-auth";
import { prisma, singletonSync } from "../../../utils.server";
import { authProviders } from "../../../config.server";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import axios from "axios";

export type UserSession = {
  user: {
    name: string;
    email: string;
  };
  uid: string;
};

const options = {
  secret: process.env.JWT_SECRET,

  // Configure one or more authentication providers
  providers: authProviders,

  // adapter: PrismaAdapter(prisma),

  callbacks: {
    async session(props) {
      return {
        ...props.session,
        accessToken: props.token.accessToken,
      };
    },
    redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url;
      // Allows relative callback URLs
      else if (url.startsWith("/")) return new URL(url, baseUrl).toString();
      return baseUrl;
    },
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
};

export default NextAuth(options);
