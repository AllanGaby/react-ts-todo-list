import { AccessDeniedError, EntityNotFoundError, UnauthorizedError, UnexpectedError, UnprocessableEntityError } from '@/data/common/errors'
import { HttpClient, HttpMethod, HttpStatusCode } from '@/data/common/protocols'
import { TaskModel, ChangeTaskToPendingUseCase, ChangeTaskToPendingDTO } from '@/domain/todo-list'

export class RemoteChangeTaskToPendingUseCase implements ChangeTaskToPendingUseCase {
  constructor (
    protected endPoint: string,
    private readonly httpClient: HttpClient
  ) {}

  async update ({ id, password }: ChangeTaskToPendingDTO): Promise<TaskModel> {
    const response = await this.httpClient.request<TaskModel>({
      method: HttpMethod.put,
      url: `${this.endPoint}/${id}/pending`,
      body: {
        password
      }
    })

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return response.body
      case HttpStatusCode.notFound:
        throw new EntityNotFoundError('Task')
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError()
      case HttpStatusCode.unauthorized:
        throw new UnauthorizedError(response.body)
      case HttpStatusCode.unprocessableEntity:
        throw new UnprocessableEntityError(response.body)
      default:
        throw new UnexpectedError(response.body)
    }
  }
}
