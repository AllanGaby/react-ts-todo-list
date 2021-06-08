import { TaskModel, mockTaskState } from '@/domain/todo-list'
import faker from 'faker'

export const mockTaskModel = (): TaskModel => ({
  id: faker.random.uuid(),
  title: faker.random.words(),
  description: faker.random.words(),
  change_to_pending: 0,
  created_at: faker.date.past(),
  updated_at: faker.date.past(),
  email: faker.internet.email(),
  state: mockTaskState()
})
