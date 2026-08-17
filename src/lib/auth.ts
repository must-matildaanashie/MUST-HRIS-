import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/db";

const providers: NextAuthOptions["providers"] = [];

// Real SSO — enabled when Google credentials are present.
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  );
}

// Demo login (no Google needed) — pick a seeded employee by email. DISABLE in production.
if (process.env.ENABLE_DEMO_LOGIN === "true") {
  providers.push(
    CredentialsProvider({
      id: "demo",
      name: "Demo account",
      credentials: { email: { label: "Email", type: "text" } },
      async authorize(credentials) {
        const email = credentials?.email?.toLowerCase().trim();
        if (!email) return null;
        const e = await prisma.employee.findUnique({ where: { email } });
        if (!e) return null;
        return { id: e.id, email: e.email, name: e.name, image: e.avatarUrl ?? undefined, role: e.role };
      },
    }),
  );
}

export const authOptions: NextAuthOptions = {
  providers,
  session: { strategy: "jwt" },
  pages: { signIn: "/signin" },
  callbacks: {
    async signIn({ user, account }) {
      const domain = process.env.ALLOWED_EMAIL_DOMAIN;
      if (account?.provider === "google" && domain) {
        return Boolean(user.email && user.email.toLowerCase().endsWith(`@${domain}`));
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role;
        token.employeeId = (user as { id?: string }).id;
      } else if (token.email && !token.employeeId) {
        const e = await prisma.employee.findUnique({ where: { email: token.email } });
        if (e) {
          token.role = e.role;
          token.employeeId = e.id;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string | undefined;
        session.user.employeeId = token.employeeId as string | undefined;
      }
      return session;
    },
  },
};
