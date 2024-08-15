import { z } from 'zod'
import { Request, Response } from 'express'
import { TODO_LIST_DATA, TODO_TYPE } from '@root/constants'
import { validateInput } from '@root/helper/validate'
import { getTodoList } from '@root/helper/todo'

const getTodoListSchema = z.object({
  type: z.coerce
    .number()
    .refine(value => value == TODO_TYPE.DONE || value == TODO_TYPE.TODO)
})

export default (req: Request, res: Response) => {
  validateInput({ schema: getTodoListSchema, requestData: req.query })

  const type = Number(req.query.type)

  const todoListData = getTodoList({ type, todoListData: TODO_LIST_DATA })

  return res.send(todoListData)
}
