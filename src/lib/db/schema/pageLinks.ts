import { pageLinkSchema } from "@/lib/validators/zod";
import { z } from "zod";
import { getPageLinks } from "@/lib/api/pageLinks/queries";

// Schema for pageLinks - used to validate API requests
export const insertPageLinkSchema = pageLinkSchema.omit({ id: true });

export const insertPageLinkParams = pageLinkSchema
  .extend({
    pageId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updatePageLinkSchema = pageLinkSchema;

export const updatePageLinkParams = updatePageLinkSchema
  .extend({
    pageId: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });

export const pageLinkIdSchema = updatePageLinkSchema.pick({ id: true });

// Types for pageLinks - used to type API request params and within Components
export type PageLink = z.infer<typeof updatePageLinkSchema>;
export type NewPageLink = z.infer<typeof insertPageLinkSchema>;
export type NewPageLinkParams = z.infer<typeof insertPageLinkParams>;
export type UpdatePageLinkParams = z.infer<typeof updatePageLinkParams>;
export type PageLinkId = z.infer<typeof pageLinkIdSchema>["id"];

// this type infers the return from getPageLinks() - meaning it will include any joins
export type CompletePageLink = Awaited<
  ReturnType<typeof getPageLinks>
>["pageLinks"][number];
