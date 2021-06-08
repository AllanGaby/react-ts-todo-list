import { ChangeTaskToPendingUseCase } from '@/domain/todo-list'
import { RemoteChangeTaskToPendingUseCase } from '@/data/todo-list/use-cases'
import { makeHttpClient, makeApiUrl } from '@/main/factories/common/http'

export const makeChangeTaskToPendingUseCase = (): ChangeTaskToPendingUseCase => {
  return new RemoteChangeTaskToPendingUseCase(
    makeApiUrl('todo/task'),
    makeHttpClient()
  )
}
