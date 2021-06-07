import { ListTasksUseCase, TaskModel } from '@/domain/todo-list'
import { RemoteListEntitiesUseCase } from '@/data/common/use-cases'
import { makeHttpClient, makeApiUrl } from '@/main/factories/common/http'

export const makeListTasksUseCase = (): ListTasksUseCase => {
  return new RemoteListEntitiesUseCase<TaskModel>(
    makeApiUrl('todo/list'),
    makeHttpClient(),
    'Task'
  )
}
