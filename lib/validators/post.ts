import { z } from 'zod'

const tagObject = z.object({
  value: z.string(),
  label: z.string(),
});

export const PostValidator = z.object({
  title: z
    .string()
    .min(3, {
      message: 'Title must be at least 3 characters long',
    })
    .max(128, {
      message: 'Title must be less than 128 characters long',
    }),
  imageUrl: z.string().min(1,{
    message: 'Image is required'
  }),
  tags: z.array(tagObject).optional()
})

export type PostCreationRequest = z.infer<typeof PostValidator>
