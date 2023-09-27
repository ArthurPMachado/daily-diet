import { z } from 'zod'

export const getMealSchema = z.object({
  id: z.string().uuid(),
})

export const getMealsSchema = z.object({
  user_id: z.string().uuid(),
})
