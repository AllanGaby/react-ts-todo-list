import { ListEntitiesUseCase, EntityModel } from '@/domain/common'
import { HttpClient, HttpMethod, HttpStatusCode } from '@/data/common/protocols'
import { UnauthorizedError, UnexpectedError, UnprocessableEntityError, EntityNotFoundError } from '@/data/common/errors'

export class RemoteListEntitiesUseCase<EntityType extends EntityModel> implements ListEntitiesUseCase<EntityType> {
  constructor (
    protected endPoint: string,
    private readonly httpClient: HttpClient,
    private readonly entityName: string
  ) {}

  async list (filter: Partial<EntityType>): Promise<EntityType[]> {
    const response = await this.httpClient.request<EntityType[]>({
      method: HttpMethod.get,
      url: this.endPoint,
      body: undefined
    })
    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return response.body
      case HttpStatusCode.notFound:
        throw new EntityNotFoundError(this.entityName)
      case HttpStatusCode.unauthorized:
        throw new UnauthorizedError(response.body)
      case HttpStatusCode.unprocessableEntity:
        throw new UnprocessableEntityError(response.body)
      default:
        throw new UnexpectedError(response.body)
    }
  }
}
