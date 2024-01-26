"use client";

import { FC, HTMLAttributes, useState } from "react";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { Icons } from "../Icons";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
  const [isPending, setIsPending] = useState<boolean>(false);

  const loginWithGoogle = async () => {
    setIsPending(true);
    try {
      await signIn("google");
    } catch (error) {
      toast({
        title: "There was a problem",
        description: "There was an error logging in with Google",
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className={cn("flex justify-center", className)} {...props}>
      <Button
        disabled={isPending}
        type="button"
        size="lg"
        className="w-full"
        onClick={loginWithGoogle}
      >
        {isPending ? null : <Icons.google className="h-4 w-4 mr-2" />}
        Sign in with Google
      </Button>
    </div>
  );
};

export default UserAuthForm;
