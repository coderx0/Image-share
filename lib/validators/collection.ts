import { z } from 'zod'

const tagObject = z.object({
  value: z.string(),
  label: z.string(),
});

export const CollectionValidator = z.object({
  title: z
    .string()
    .min(3, {
      message: 'Title must be at least 3 characters long',
    })
    .max(128, {
      message: 'Title must be less than 128 characters long',
    }),
})

export type CollectionCreationRequest = z.infer<typeof CollectionValidator>
