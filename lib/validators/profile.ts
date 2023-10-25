import { z } from 'zod'

export const ProfileImageValidator = z.object({
  imageUrl: z.string().min(1,{
    message: 'Image is required'
  }),
})

export type ProfileImageUpdateRequest = z.infer<typeof ProfileImageValidator>

export const ProfileDetailsValidator = z.object({
  userName: z
  .string()
  .min(3, {
    message: 'User name must be at least 3 characters long',
  })
  .max(128, {
    message: 'User name must be less than 30 characters long',
  }),
  bio: z.string()
  .max(300,{
    message:"Bio must be at most 300 characters long"
  })
})

export type ProfileDetailsUpdateRequest = z.infer<typeof ProfileDetailsValidator>
