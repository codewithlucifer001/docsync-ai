import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "Ov23liynKcxPIEvUcGam",
      clientSecret: process.env.GITHUB_SECRET || "c9248212df71906a3b8b9c8227149515e08ac1a4",
      authorization: {
        params: {
          scope: "read:user user:email repo"
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET || "docsync_secret_production_2026",
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