import { TODO_LIST_DATA, TODO_TYPE } from '@root/constants'
import { TODO_IS_NOT_EXIST } from '@root/constants/error_message'

type TodoType = {
  id: number
  description: string
  status: number
}

export function deleteTodo({
  id,
  todoListData
}: {
  id: number
  todoListData: TodoType[]
}) {
  const itemIndex = [...todoListData].findIndex(item => item.id === id)
  if (itemIndex === -1) {
    throw new Error(TODO_IS_NOT_EXIST)
  }
  todoListData.splice(itemIndex, 1)
  return todoListData
}

export function updateTodo({
  id,
  description,
  status,
  todoListData
}: {
  id: number
  description: string
  status: number
  todoListData: TodoType[]
}) {
  const itemIndex = [...todoListData].findIndex(item => item.id === id)
  if (itemIndex === -1) {
    throw new Error(TODO_IS_NOT_EXIST)
  }
  todoListData[itemIndex] = { id, description, status }
  return todoListData
}

export function getTodoList({
  type,
  todoListData
}: {
  type: number
  todoListData: TodoType[]
}) {
  if (type === TODO_TYPE.DONE) {
    return todoListData.filter(todo => todo.status === TODO_TYPE.DONE)
  }
  return todoListData.filter(todo => todo.status === TODO_TYPE.TODO)
}

export function createTodo({
  id,
  description,
  status,
  todoListData
}: {
  id: number
  description: string
  status: number
  todoListData: TodoType[]
}) {
  TODO_LIST_DATA.push({ description, status, id })
  return todoListData
}
