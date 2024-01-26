import { api } from "@/lib/trpc/api";
import { MousePointerClickIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

export default async function Page({ params }: { params: { slug: string } }) {
  const p = await api.pages.getPageBySlugWithLinks.query({ slug: params.slug });

  if (!p.page?.slug) return notFound();

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-yellow-50 text-gray-900 py-6">
      <header className="flex flex-col items-center justify-center space-y-2 px-4 md:px-0">
        <h1 className="text-4xl font-bold">{p.page.title}</h1>
        <p className="text-center text-lg">{p.page.description}</p>
      </header>
      <main className="flex flex-col items-center justify-center space-y-4 mt-10 w-full px-4 md:px-0">
        {p.page.PageLink.map((val, ind) => (
          <Link
            key={val.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-96 py-3 group bg-primary justify-between rounded-md flex items-center px-3 space-x-3 text-lg font-medium shadow-md transform transition duration-300 ease-in-out hover:scale-105"
            href={`https://${val.url}`}
          >
            <p className="text-center w-full">{val.title}</p>
            <MousePointerClickIcon className="invisible min-w-6 w-6 h-6 min-h-6 group-hover:visible delay-150 transition-transform transform-cpu" />
          </Link>
        ))}
      </main>
      <footer className="mt-auto mb-4 pt-4 text-center">
        <p className="text-sm">
          Powered by{" "}
          <a
            target="_blank"
            href="https://linkBee.vercel.app/"
            rel="noopener noreferrer"
            className="underline-offset-2 underline"
          >
            LinkBee
          </a>
        </p>
      </footer>
    </section>
  );
}
