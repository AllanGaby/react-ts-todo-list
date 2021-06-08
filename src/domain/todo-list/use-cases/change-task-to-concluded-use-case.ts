import { TaskModel } from '@/domain/todo-list'

export interface ChangeTaskToConcludedUseCase {
  update: (taskId: string) => Promise<TaskModel>
}
