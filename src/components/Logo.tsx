"use client";

import { useTheme } from "next-themes";
import { FC } from "react";

interface logoProps {
  size?: "default" | "sm";
}

const Logo: FC<logoProps> = ({ size = "default" }) => {
  const { resolvedTheme } = useTheme();

  return (
    <div
      className={`flex relative items-center justify-center space-x-1 group text-primary `}
    >
      <h2 className={`font-black  ${size === "sm" ? "text-xl" : "text-4xl"}`}>
        Link
      </h2>
      <img
        src="/logo.svg"
        alt="logo"
        className={`flex group-hover:hidden  ${
          size === "sm" ? "w-5 h-5" : "w-10 h-10"
        } `}
      />
      <img
        src="/animated.webp"
        alt="logo"
        className={`hidden group-hover:flex ${
          size === "sm" ? "w-5 h-5" : "w-10 h-10"
        } `}
      />
    </div>
  );
};

export default Logo;
