import { SidebarLink } from "@/components/SidebarItems";
import { Globe, DoorOpenIcon, HomeIcon } from "lucide-react";

export const defaultLinks: SidebarLink[] = [
  { href: "/", title: "Home", icon: HomeIcon },
  { href: "/pages", title: "Pages", icon: DoorOpenIcon },
  { href: "/page-links", title: "Page Links", icon: Globe },
];
