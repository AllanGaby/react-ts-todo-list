import { CreateTaskUseCase, TaskModel, CreateTaskDTO } from '@/domain/todo-list'
import { RemoteCreateEntityUseCase } from '@/data/common/use-cases'
import { makeHttpClient, makeApiUrl } from '@/main/factories/common/http'

export const makeCreateTaskUseCase = (): CreateTaskUseCase => {
  return new RemoteCreateEntityUseCase<CreateTaskDTO, TaskModel>(
    makeApiUrl('todo/task'),
    makeHttpClient(),
    'Task'
  )
}
