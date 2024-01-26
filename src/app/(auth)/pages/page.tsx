import PageList from "@/components/pages/PageList";
import NewPageModal from "@/components/pages/PageModal";
import { getAuthSession } from "@/lib/auth/utils";
import { api } from "@/lib/trpc/api";
import { notFound } from "next/navigation";

export default async function Pages() {
  const session = await getAuthSession();
  if (!session) return notFound();

  const { pages } = await api.pages.getPages.query();

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2 text-black">Pages</h1>
        <NewPageModal />
      </div>
      <PageList pages={pages} />
    </main>
  );
}
