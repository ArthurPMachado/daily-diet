import { z } from 'zod'

export const createMealSchema = z.object({
  user_id: z.string().uuid(),
  name: z.string(),
  description: z.string().min(10).max(360),
  meal_date: z.string(),
  meal_time: z.string(),
  is_in_diet: z.boolean(),
})
