import { TaskModel } from '@/domain/todo-list'
import { CreateEntityUseCase } from '@/domain/common'

export type CreateTaskDTO = {
  title: string
  description: string
  email: string
}

export interface CreateTaskUseCase extends CreateEntityUseCase<CreateTaskDTO, TaskModel> {}
