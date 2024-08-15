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

/**
 * @swagger
 * /todo:
 *   post:
 *     summary: Create a new todo item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               status:
 *                 type: number
 *             example:
 *               description: "string"
 *               status: 0
 *     responses:
 *       200:
 *         description: Todo created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     example: 1
 *                   description:
 *                     type: string
 *                     example: "string"
 *                   status:
 *                     type: number
 *                     example: 0
 *       400:
 *         description: Bad request, invalid data provided
 *       500:
 *         description: Internal server error
 */

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
