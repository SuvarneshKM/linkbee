"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import UserAuthForm from "./UserAuthForm";

export default function SignIn() {
  const { data: session, status } = useSession();

  if (status === "loading")
    return (
      <div className="flex items-center justify-center ">
        <img src={"/animated.webp"} alt="bee" className="w-10 h-10" />
      </div>
    );

  if (session) {
    return (
      <div className="flex items-center justify-center">
        <Button variant={"destructive"} onClick={() => signOut()}>
          Sign out
        </Button>
      </div>
    );
  }
  return (
    <div className="">
      <UserAuthForm />
    </div>
  );
}
