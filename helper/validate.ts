import { z } from 'zod'

export function validateInput({
  schema,
  requestData
}: {
  schema: z.ZodObject<any, any>
  requestData: any
}) {
  const { success, error } = schema.safeParse(requestData)
  if (!success) {
    throw new Error(error.message)
  }
}
