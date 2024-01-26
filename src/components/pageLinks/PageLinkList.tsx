"use client";
import { CompletePageLink } from "@/lib/db/schema/pageLinks";
import { trpc } from "@/lib/trpc/client";
import PageLinkModal from "./PageLinkModal";

export default function PageLinkList({
  pageLinks,
}: {
  pageLinks: CompletePageLink[];
}) {
  const { data: p } = trpc.pageLinks.getPageLinks.useQuery(undefined, {
    initialData: { pageLinks },
    refetchOnMount: false,
  });

  if (p.pageLinks.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {p.pageLinks.map((pageLink) => (
        <PageLink pageLink={pageLink} key={pageLink.id} />
      ))}
    </ul>
  );
}

const PageLink = ({ pageLink }: { pageLink: CompletePageLink }) => {
  return (
    <li className="flex justify-between items-center border bg-yellow-100 border-primary rounded-lg my-2 px-4 py-2 text-black">
      <div className="w-full">
        <div>{pageLink.title}</div>
      </div>
      <PageLinkModal pageLink={pageLink} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-black">No page links</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new page link.
      </p>
      <div className="flex items-center justify-center">
        <img src="/empty.svg" alt="empty" className="w-20 h-20" />
      </div>
      <div className="mt-6">
        <PageLinkModal emptyState={true} />
      </div>
    </div>
  );
};
