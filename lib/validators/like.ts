import { z } from 'zod'

export const PostLikeValidator = z.object({
  postId: z.string(),
  likeType: z.enum(['LIKE', 'UNLIKE']),
})

export type PostLikeRequest = z.infer<typeof PostLikeValidator>

