import { EntityModel, ListEntitiesUseCase } from '@/domain/common'

export class ListEntitiesUseCaseSpy<EntityType extends EntityModel> implements ListEntitiesUseCase<EntityType> {
  filter: Partial<EntityType>
  entities: EntityType[]

  async list (filter: Partial<EntityType>): Promise<EntityType[]> {
    this.filter = filter
    return this.entities
  }
}
