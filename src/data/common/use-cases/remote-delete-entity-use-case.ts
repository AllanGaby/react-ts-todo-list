import { DeleteEntityUseCase, EntityModel } from '@/domain/common'
import { HttpClient, HttpMethod, HttpStatusCode } from '@/data/common/protocols'
import { ConflictOnCreateEntityError, UnauthorizedError, UnexpectedError, UnprocessableEntityError } from '@/data/common/errors'

export class RemoteDeleteEntityUseCase<EntityType extends EntityModel> implements DeleteEntityUseCase<EntityType> {
  constructor (
    protected endPoint: string,
    private readonly httpClient: HttpClient,
    private readonly entityName: string
  ) {}

  async delete (filter: Partial<EntityType>): Promise<void> {
    const response = await this.httpClient.request<EntityType>({
      method: HttpMethod.delete,
      url: this.endPoint,
      body: undefined
    })
    switch (response.statusCode) {
      case HttpStatusCode.noContent:
        return undefined
      case HttpStatusCode.conflict:
        throw new ConflictOnCreateEntityError(this.entityName)
      case HttpStatusCode.unauthorized:
        throw new UnauthorizedError(response.body)
      case HttpStatusCode.unprocessableEntity:
        throw new UnprocessableEntityError(response.body)
      default:
        throw new UnexpectedError(response.body)
    }
  }
}
