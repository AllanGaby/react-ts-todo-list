import { ChangeTaskToConcludedUseCase } from '@/domain/todo-list'
import { RemoteChangeTaskToConcludedUseCase } from '@/data/todo-list/use-cases'
import { makeHttpClient, makeApiUrl } from '@/main/factories/common/http'

export const makeChangeTaskToConcludedUseCase = (): ChangeTaskToConcludedUseCase => {
  return new RemoteChangeTaskToConcludedUseCase(
    makeApiUrl('todo/task'),
    makeHttpClient()
  )
}
