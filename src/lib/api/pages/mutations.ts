import { getAuthSession } from "@/lib/auth/utils";
import { db } from "@/lib/db/index";
import {
  PageId,
  NewPageParams,
  UpdatePageParams,
  updatePageSchema,
  insertPageSchema,
  pageIdSchema,
} from "@/lib/db/schema/pages";

export const createPage = async (page: NewPageParams) => {
  const session = await getAuthSession();

  const newPage = insertPageSchema.parse({
    ...page,
    userId: session?.user.id!,
  });
  const isUnique = await db.page.findMany({
    where: {
      slug: newPage.slug,
    },
  });

  const isSlugUnique = async (slug: string) => {
    const existingPage = await db.page.findMany({
      where: { slug },
    });

    if (existingPage.length > 0) {
      return false;
    } else {
      return true;
    }
  };

  const generateUniqueSlug = async (originalSlug: string) => {
    let counter = 1;
    let modifiedSlug = originalSlug;

    // Keep incrementing the counter until a unique slug is found
    while (!(await isSlugUnique(modifiedSlug))) {
      modifiedSlug = `${originalSlug}-${counter++}`;
    }

    return modifiedSlug;
  };

  try {
    if (isUnique.length > 0) {
      const newSlug: string = await generateUniqueSlug(newPage.slug);
      const p = await db.page.create({ data: { ...newPage, slug: newSlug } });
      return { page: p };
    } else {
      const p = await db.page.create({ data: newPage });
      return { page: p };
    }
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updatePage = async (id: PageId, page: UpdatePageParams) => {
  const session = await getAuthSession();
  const { id: pageId } = pageIdSchema.parse({ id });
  const newPage = updatePageSchema.parse({
    ...page,
    userId: session?.user.id!,
  });
  try {
    const p = await db.page.update({
      where: { id: pageId, userId: session?.user.id! },
      data: newPage,
    });
    return { page: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deletePage = async (id: PageId) => {
  const session = await getAuthSession();
  const { id: pageId } = pageIdSchema.parse({ id });
  try {
    const p = await db.page.delete({
      where: { id: pageId, userId: session?.user.id! },
    });
    return { page: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
