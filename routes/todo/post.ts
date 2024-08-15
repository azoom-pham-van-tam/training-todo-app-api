import { Request, Response } from 'express'
import { TODO_LIST_DATA, TODO_TYPE } from '@root/constants'
import { z } from 'zod'
import { validateInput } from '@root/helper/validate'
import { createTodo } from '@root/helper/todo'

const createTodoSchema = z.object({
  description: z.string(),
  status: z.coerce
    .number()
    .refine(value => value == TODO_TYPE.DONE || value == TODO_TYPE.TODO)
})

export default (req: Request, res: Response) => {
  validateInput({ schema: createTodoSchema, requestData: req.body })

  const description = String(req.body.description)
  const status = Number(req.body.status)
  const ids = TODO_LIST_DATA.map(todo => todo.id)
  const newId = Math.max(...ids) + 1

  const todoList = createTodo({
    id: newId,
    description,
    status,
    todoListData: TODO_LIST_DATA
  })
  return res.send(todoList)
}
