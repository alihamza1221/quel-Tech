import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import dbConnect from "@/db/mongooseConnect";
import { userModel } from "@/db/models/user";

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      httpOptions: {
        timeout: 10000, // 10 seconds
      },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
  ],
  callbacks: {
    //user is received as params user can be passed from jwt to session for security
    async signIn({ user }) {
      if (!user) return false;
      try {
        await dbConnect();
        const existingUser = await userModel.findOne({ email: user.email });
        if (existingUser) {
          console.log("user already exists\n");
          return true;
        }
        console.log("signin user", user);
        const newUser = await userModel.create({
          ...user,
        });
        await newUser.save();
      } catch (err) {
        return false;
      }

      return true;
    },
    //@ts-ignore
    async jwt({ token }) {
      return token;
    },
    //update user in session

    //@ts-ignore
    async session({ session, token }) {
      /*  @session.user = { 
        username: "username";
        email: email@gmail.com;
        image: https://example.com/image.jpg;

      } */

      return session;
    },
  },
  pages: {
    signIn: "",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
