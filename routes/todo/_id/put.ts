import { z } from 'zod'
import { Request, Response } from 'express'
import { TODO_LIST_DATA } from '@root/constants/index.js'
import { validateInput } from '@root/helper/validate.js'
import { updateTodo } from '@root/helper/todo.js'

const UpdateTodoSchema = z.object({
  id: z.coerce.number(),
  description: z.string(),
  status: z.coerce.number()
})

export default (req: Request, res: Response) => {
  validateInput({
    schema: UpdateTodoSchema,
    requestData: { ...req.body, ...req.params }
  })

  const description = String(req.body.description)
  const status = Number(req.body.status)
  const id = Number(req.params.id)

  updateTodo({ id, description, status, todoListData: TODO_LIST_DATA })

  return res.send(TODO_LIST_DATA)
}
