import { z } from 'zod'
import { Request, Response } from 'express'
import { TODO_LIST_DATA } from '@root/constants'
import { validateInput } from '@root/helper/validate'
import { deleteTodo } from '@root/helper/todo'

const DeleteTodoSchema = z.object({
  id: z.coerce.number()
})

export default (req: Request, res: Response) => {
  validateInput({
    schema: DeleteTodoSchema,
    requestData: req.params
  })

  const id = Number(req.params.id)
  deleteTodo({ id, todoListData: TODO_LIST_DATA })

  return res.send(TODO_LIST_DATA)
}
