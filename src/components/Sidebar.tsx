import Link from "next/link";

import SidebarItems from "./SidebarItems";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import Image from "next/image";
import Logo from "./Logo";
import { getAuthSession } from "@/lib/auth/utils";
import { Session } from "next-auth";

const Sidebar = async () => {
  const session = await getAuthSession();
  if (session === null) return null;

  return (
    <aside className="h-screen min-w-52 bg-muted hidden md:block p-4 pt-8 border-r border-border shadow-inner">
      <div className="flex flex-col justify-between h-full">
        <div className="space-y-4">
          <div className="flex items-start">
            <Logo />
          </div>
          <SidebarItems />
        </div>
        <UserDetails session={session} />
      </div>
    </aside>
  );
};

export default Sidebar;

const UserDetails = ({ session }: { session: Session }) => {
  if (session === null) return null;
  const { user } = session;

  if (!user?.name || user.name.length == 0) return null;

  return (
    <div className="flex items-center justify-between w-full border-t border-border pt-4 px-2">
      <div className="text-muted-foreground">
        <p className="text-xs">{user.name ?? "Suvarnesh K M"}</p>
        <p className="text-xs font-light pr-4">
          {user.email ?? "suvarnesh1729@gmail.com"}
        </p>
      </div>
      <Avatar className="h-10 w-10">
        {user.image ? (
          <Image src={user.image} alt="avatar" width={50} height={50} />
        ) : (
          <AvatarFallback className="border-border border-2 text-muted-foreground">
            {user.name
              ? user.name
                  ?.split(" ")
                  .map((word) => word[0].toUpperCase())
                  .join("")
              : "~"}
          </AvatarFallback>
        )}
      </Avatar>
    </div>
  );
};
