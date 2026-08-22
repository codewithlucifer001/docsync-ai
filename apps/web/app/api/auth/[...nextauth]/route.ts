import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

const clientId = process.env.GITHUB_ID || "";
const clientSecret = process.env.GITHUB_SECRET || "";

export const authOptions: NextAuthOptions = {
  providers: [
    ...(clientId && clientSecret
      ? [
          GithubProvider({
            clientId,
            clientSecret,
            authorization: {
              params: {
                scope: "read:user user:email repo"
              }
            }
          })
        ]
      : [])
  ],
  secret: process.env.NEXTAUTH_SECRET || "docsync_default_local_secret_2026",
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.accessToken = token.accessToken;
      return session;
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };