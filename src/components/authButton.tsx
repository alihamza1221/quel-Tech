"use client";
import { Button } from "./ui/button";
import { signIn, signOut } from "next-auth/react";
import { Session } from "next-auth";
const AuthButton = ({ session }: { session: Session | null }) => {
  return (
    <>
      <Button
        size="lg"
        onClick={() => (session ? signOut() : signIn("google"))}
        className="h-12 bg-transparent text-base font-heading md:text-lg lg:h-14 lg:text-xl mr-4"
      >
        {session?.user ? "Sign out" : "Sign in"}
      </Button>
    </>
  );
};

export default AuthButton;
