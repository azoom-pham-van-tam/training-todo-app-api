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

/**
 * @swagger
 * /todo/{id}:
 *   put:
 *     summary: Update a todo item
 *     description: Updates a todo item based on the provided ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the todo item to update
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 example: "Updated todo description"
 *               status:
 *                 type: integer
 *                 example: 1
 *             required:
 *               - description
 *               - status
 *     responses:
 *       200:
 *         description: Todo item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 description:
 *                   type: string
 *                   example: "Updated todo description"
 *                 status:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Bad request, invalid ID or data provided
 *       404:
 *         description: Todo item not found
 *       500:
 *         description: Internal server error
 */

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
