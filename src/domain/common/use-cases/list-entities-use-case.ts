import { EntityModel } from '@/domain/common'

export interface ListEntitiesUseCase<EntityType extends EntityModel> {
  list: (filter: Partial<EntityType>) => Promise<EntityType[]>
}
