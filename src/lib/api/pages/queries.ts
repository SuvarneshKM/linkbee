import { getAuthSession } from "@/lib/auth/utils";
import { db } from "@/lib/db/index";
import {
  type PageId,
  PageSlug,
  pageSlugSchema,
  pageIdSchema,
} from "@/lib/db/schema/pages";

export const getPages = async () => {
  const session = await getAuthSession();
  const p = await db.page.findMany({ where: { userId: session?.user.id! } });
  return { pages: p };
};

export const getPageById = async (id: PageId) => {
  const session = await getAuthSession();
  const { id: pageId } = pageIdSchema.parse({ id });
  const p = await db.page.findFirst({
    where: { id: pageId, userId: session?.user.id! },
  });
  return { page: p };
};
export const getPageBySlugWithLinks = async (slug: PageSlug) => {
  const session = await getAuthSession();
  const { slug: PageSlug } = pageSlugSchema.parse({ slug });
  const p = await db.page.findFirst({
    where: { slug: PageSlug, userId: session?.user.id! },
    include: {
      PageLink: true,
    },
  });
  return { page: p };
};
