import PageLinkList from "@/components/pageLinks/PageLinkList";
import NewPageLinkModal from "@/components/pageLinks/PageLinkModal";
import { getAuthSession } from "@/lib/auth/utils";
import { api } from "@/lib/trpc/api";
import { notFound } from "next/navigation";

export default async function PageLinks() {
  const session = await getAuthSession();
  if (!session) return notFound();

  const { pageLinks } = await api.pageLinks.getPageLinks.query();

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2 text-black">Page Links</h1>
        <NewPageLinkModal />
      </div>
      <PageLinkList pageLinks={pageLinks} />
    </main>
  );
}
