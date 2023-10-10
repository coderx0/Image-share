import { z } from 'zod'

export const UserFollowValidator = z.object({
  userId: z.string(),
  followType: z.enum(['FOLLOW', 'UNFOLLOW']),
})

export type UserFollowRequest = z.infer<typeof UserFollowValidator>

