import GithubProvider from "next-auth/providers/github";

/**
 * Auth Providers
 * https://next-auth.js.org/configuration/providers
 */
export const authProviders = [
  GithubProvider({
    clientId: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
  })
]