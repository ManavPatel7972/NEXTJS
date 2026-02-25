import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/lib/connectDB";
import User from "@/models/user.model";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 , 
  },

  jwt: {
    maxAge: 30, 
  },

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async signIn({ user }) {
      await connectDB();

      const existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        await User.create({
          name: user.name,
          email: user.email,
          isGoogleUser: true,
        });
      }

      return true;
    },

    async session({ session }) {
      await connectDB();

      const dbUser = await User.findOne({ email: session.user.email });

      session.user.id = dbUser._id.toString();

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET
  
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
