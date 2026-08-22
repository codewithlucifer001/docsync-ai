import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "Ov23liynKcxPIEvUcGam",
      clientSecret: process.env.GITHUB_SECRET || "c9248212df71906a3b8b9c8227149515e08ac1a4"
    })
  ],
  secret: process.env.NEXTAUTH_SECRET || "docsync_secret_production_2026"
});

export { handler as GET, handler as POST };