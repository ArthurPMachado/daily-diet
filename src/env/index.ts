import 'dotenv/config'
import { z } from 'zod'

const schema = z.object({
  NODE_ENV: z.enum(['dev', 'qa', 'production']).default('dev'),
  PORT: z.coerce.number().default(3000),
  DATABASE_CLIENT: z.enum(['sqlite']),
  DATABASE_URL: z.string().nonempty(),
})

const validateSchema = schema.safeParse(process.env)

if (!validateSchema.success) {
  console.log('❌ Invalid environment variables', validateSchema.error.format())

  throw new Error('Invalid environment variables')
}

export const configuration = validateSchema.data
