import { z } from 'zod'

export const getMealSchema = z.object({
  id: z.string().uuid(),
})
