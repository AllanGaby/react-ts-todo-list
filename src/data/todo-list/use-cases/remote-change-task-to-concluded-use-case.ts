import { EntityNotFoundError, UnexpectedError } from '@/data/common/errors'
import { HttpClient, HttpMethod, HttpStatusCode } from '@/data/common/protocols'
import { TaskModel, ChangeTaskToConcludedUseCase } from '@/domain/todo-list'

export class RemoteChangeTaskToConcludedUseCase implements ChangeTaskToConcludedUseCase {
  constructor (
    protected endPoint: string,
    private readonly httpClient: HttpClient
  ) {}

  async update (entityId: string): Promise<TaskModel> {
    const response = await this.httpClient.request<TaskModel>({
      method: HttpMethod.put,
      url: `${this.endPoint}/${entityId}/concluded`,
      body: undefined
    })

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return response.body
      case HttpStatusCode.notFound:
        throw new EntityNotFoundError('Task')
      default:
        throw new UnexpectedError(response.body)
    }
  }
}
