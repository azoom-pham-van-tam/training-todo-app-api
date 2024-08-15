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

/**
 * @swagger
 * /todo:
 *   get:
 *     summary: Get todo list
 *     parameters:
 *       - name: type
 *         in: query
 *         description: Type of todo items to filter
 *         required: true
 *         schema:
 *           type: integer
 *           enum: [0, 1]
 *           example: 1
 *     responses:
 *       200:
 *         description: Todo list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   description:
 *                     type: string
 *                     example: "todo description"
 *                   status:
 *                     type: integer
 *                     example: 0
 *                 required:
 *                   - id
 *                   - description
 *                   - status
 *       400:
 *         description: Bad request, invalid data provided
 *       500:
 *         description: Internal server error
 */

export default (req: Request, res: Response) => {
  validateInput({ schema: getTodoListSchema, requestData: req.query })

  const type = Number(req.query.type)

  const todoListData = getTodoList({ type, todoListData: TODO_LIST_DATA })

  return res.send(todoListData)
}
