import { EntityModel, UpdateEntityUseCase } from '@/domain/common'

export class UpdateEntityUseCaseSpy<UpdateEntityDTO, EntityType extends EntityModel> implements UpdateEntityUseCase<UpdateEntityDTO, EntityType> {
  entityId: string
  paramsDTO: UpdateEntityDTO
  entity: EntityType

  async update (entityId: string, paramsDTO: UpdateEntityDTO): Promise<EntityType> {
    this.entityId = entityId
    this.paramsDTO = paramsDTO
    return this.entity
  }
}
