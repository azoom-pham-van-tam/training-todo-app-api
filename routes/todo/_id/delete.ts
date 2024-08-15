import { z } from 'zod'
import { Request, Response } from 'express'
import { TODO_LIST_DATA } from '@root/constants'
import { validateInput } from '@root/helper/validate'
import { deleteTodo } from '@root/helper/todo'

const DeleteTodoSchema = z.object({
  id: z.coerce.number()
})

/**
 * @swagger
 * /todo/{id}:
 *   delete:
 *     summary: Delete a todo item
 *     description: Deletes a todo item based on the provided ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the todo item to delete
 *         required: true
 *         schema:
 *           type: integer
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
 *         description: Bad request, invalid ID or data provided
 *       404:
 *         description: Todo item not found
 *       500:
 *         description: Internal server error
 */

export default (req: Request, res: Response) => {
  validateInput({
    schema: DeleteTodoSchema,
    requestData: req.params
  })

  const id = Number(req.params.id)
  deleteTodo({ id, todoListData: TODO_LIST_DATA })

  return res.send(TODO_LIST_DATA)
}
