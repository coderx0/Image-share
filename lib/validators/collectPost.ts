import { z } from 'zod'

export const PostCollectValidator = z.object({
  postId: z.string(),
  collectionId: z.string(),
  collectType: z.enum(['COLLECT', 'UNCOLLECT']),
})

export type PostCollectRequest = z.infer<typeof PostCollectValidator>

