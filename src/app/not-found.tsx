import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-yellow-50 text-black">
      <div className="flex flex-col space-y-5 text-center items-center">
        <h2 className="text-4xl text-pretty text-primary font-bold">
          Not Found
        </h2>
        <p className="text-xl ">
          We&apos;re sorry for the inconvenience. The bees might have misplaced
          this page.
        </p>
        <img src="lost.svg" alt="lost" className="w-20 h-20" />
        <Link
          href="/"
          className={`${buttonVariants({
            size: "lg",
            className: "font-semibold",
          })}`}
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
