import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import crypto from "crypto";

const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.sub) {
        session.token = crypto
          .createHash("md5")
          .update(token.sub)
          .digest("hex");
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.match(/redirect/)) {
        return url;
      } else {
        return `/redirect?to=${url.replace(baseUrl, "")}`;
      }
    },
  },
  secret: process.env.SECRET || "",
};

export default NextAuth(options);
