import * as z from "zod"
import { CompleteUser, relatedUserSchema, CompletePageLink, relatedPageLinkSchema } from "./index"

export const pageSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  slug: z.string(),
  userId: z.string(),
})

export interface CompletePage extends z.infer<typeof pageSchema> {
  user: CompleteUser
  PageLink: CompletePageLink[]
}

/**
 * relatedPageSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedPageSchema: z.ZodSchema<CompletePage> = z.lazy(() => pageSchema.extend({
  user: relatedUserSchema,
  PageLink: relatedPageLinkSchema.array(),
}))
