"use client";
import { CompletePage } from "@/lib/db/schema/pages";
import { trpc } from "@/lib/trpc/client";
import PageModal from "./PageModal";
import Link from "next/link";
import { Button } from "../ui/button";
import { useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";

export default function PageList({ pages }: { pages: CompletePage[] }) {
  const { data: p } = trpc.pages.getPages.useQuery(undefined, {
    initialData: { pages },
    refetchOnMount: false,
  });

  if (p.pages.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul className="text-black">
      {p.pages.map((page) => (
        <Page page={page} key={page.id} />
      ))}
    </ul>
  );
}

const Page = ({ page }: { page: CompletePage }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    if (page.slug) {
      navigator.clipboard
        .writeText(`https://linkbee.vercel.app/${page.slug}`)
        .then(() => {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 1500);
        })
        .catch((err) => {
          console.error("Error copying text:", err);
        });
    }
  };
  return (
    <li className="flex justify-between items-center border bg-yellow-100 border-primary rounded-lg my-2 px-4 py-2 text-black">
      <div className="w-full">
        <div>{page.title}</div>
      </div>
      <div className="flex items-center space-x-1">
        <div
          onClick={handleCopyClick}
          className="flex cursor-pointer items-center justify-center w-10 h-10 bg-white border border-primary rounded-lg"
        >
          {isCopied ? (
            <div className="text-black w-5 h-5 flex items-center justify-center cursor-default">
              <CheckIcon />
            </div>
          ) : (
            <div className="text-black w-5 h-5 flex items-center justify-center cursor-pointer transition-opacity duration-500">
              <CopyIcon />
            </div>
          )}
        </div>
        <PageModal page={page} />
      </div>
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-black">No pages</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new page.
      </p>
      <div className="flex items-center justify-center">
        <img src="/empty.svg" alt="empty" className="w-20 h-20" />
      </div>
      <div className="mt-6">
        <PageModal emptyState={true} />
      </div>
    </div>
  );
};
