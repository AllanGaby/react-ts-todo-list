import { UpdateEntityUseCase, EntityModel } from '@/domain/common'
import { HttpClient, HttpMethod, HttpStatusCode } from '@/data/common/protocols'
import { UnauthorizedError, UnexpectedError, UnprocessableEntityError, EntityNotFoundError } from '@/data/common/errors'

export class RemoteUpdateEntityUseCase<UpdateEntityDTO, EntityType extends EntityModel> implements UpdateEntityUseCase<UpdateEntityDTO, EntityType> {
  constructor (
    protected endPoint: string,
    private readonly httpClient: HttpClient,
    private readonly entityName: string
  ) {}

  async update (entityId: string, paramsDTO: UpdateEntityDTO): Promise<EntityType> {
    const response = await this.httpClient.request<EntityType>({
      method: HttpMethod.put,
      url: `${this.endPoint}/${entityId}`,
      body: paramsDTO
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
