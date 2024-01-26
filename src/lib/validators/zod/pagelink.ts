import * as z from "zod"
import { CompletePage, relatedPageSchema, CompleteUser, relatedUserSchema } from "./index"

export const pageLinkSchema = z.object({
  id: z.string(),
  title: z.string(),
  url: z.string(),
  pageId: z.string(),
  userId: z.string(),
})

export interface CompletePageLink extends z.infer<typeof pageLinkSchema> {
  page: CompletePage
  user: CompleteUser
}

/**
 * relatedPageLinkSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedPageLinkSchema: z.ZodSchema<CompletePageLink> = z.lazy(() => pageLinkSchema.extend({
  page: relatedPageSchema,
  user: relatedUserSchema,
}))
