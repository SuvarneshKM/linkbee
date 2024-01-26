import { pageSchema } from "@/lib/validators/zod";
import { z } from "zod";
import { db } from "@/lib/db/index";
import { getPages } from "@/lib/api/pages/queries";

// Schema for pages - used to validate API requests
export const insertPageSchema = pageSchema.omit({ id: true });

export const insertPageParams = pageSchema
  .extend({
    // public: z.coerce.boolean(),
    slug: z.string().min(3),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updatePageSchema = pageSchema;

export const updatePageParams = updatePageSchema
  .extend({
    // public: z.coerce.boolean(),
  })
  .omit({
    userId: true,
  });

export const pageIdSchema = updatePageSchema.pick({ id: true });
export const pageSlugSchema = updatePageSchema.pick({ slug: true });

// Types for pages - used to type API request params and within Components
export type Page = z.infer<typeof updatePageSchema>;
export type NewPage = z.infer<typeof insertPageSchema>;
export type NewPageParams = z.infer<typeof insertPageParams>;
export type UpdatePageParams = z.infer<typeof updatePageParams>;
export type PageId = z.infer<typeof pageIdSchema>["id"];
export type PageSlug = z.infer<typeof pageSlugSchema>["slug"];

// this type infers the return from getPages() - meaning it will include any joins
export type CompletePage = Awaited<
  ReturnType<typeof getPages>
>["pages"][number];
