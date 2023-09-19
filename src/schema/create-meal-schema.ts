import { z } from 'zod'

export const createMealSchema = z.object({
  user_id: z.string().uuid(),
  name: z.string(),
  description: z.string().min(10).max(360).nullable(),
  meal_date: z.date(),
  meal_time: z.string(),
  is_in_diet: z.boolean(),
})
