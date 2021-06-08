import { TaskModel } from '@/domain/todo-list'

export type ChangeTaskToPendingDTO = {
  id: string
  password: string
}

export interface ChangeTaskToPendingUseCase {
  update: (paramsDTO: ChangeTaskToPendingDTO) => Promise<TaskModel>
}
