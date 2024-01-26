import {
  getPageById,
  getPageBySlugWithLinks,
  getPages,
} from "@/lib/api/pages/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  pageIdSchema,
  insertPageParams,
  updatePageParams,
} from "@/lib/db/schema/pages";
import { createPage, deletePage, updatePage } from "@/lib/api/pages/mutations";
import { z } from "zod";

export const pagesRouter = router({
  getPages: publicProcedure.query(async () => {
    return getPages();
  }),
  getPageById: publicProcedure.input(pageIdSchema).query(async ({ input }) => {
    return getPageById(input.id);
  }),
  getPageBySlugWithLinks: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      return getPageBySlugWithLinks(input.slug);
    }),
  createPage: publicProcedure
    .input(insertPageParams)
    .mutation(async ({ input }) => {
      return createPage(input);
    }),
  updatePage: publicProcedure
    .input(updatePageParams)
    .mutation(async ({ input }) => {
      return updatePage(input.id, input);
    }),
  deletePage: publicProcedure
    .input(pageIdSchema)
    .mutation(async ({ input }) => {
      return deletePage(input.id);
    }),
});
