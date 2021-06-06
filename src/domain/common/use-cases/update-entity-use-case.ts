import { EntityModel } from '@/domain/common'

export interface UpdateEntityUseCase<UpdateEntityDTO, EntityType extends EntityModel> {
  update: (entityId: string, paramsDTO: UpdateEntityDTO) => Promise<EntityType>
}
