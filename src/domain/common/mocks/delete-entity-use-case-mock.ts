import { EntityModel, DeleteEntityUseCase } from '@/domain/common'

export class DeleteEntityUseCaseSpy<EntityType extends EntityModel> implements DeleteEntityUseCase<EntityType> {
  filter: Partial<EntityType>

  async delete (filter: Partial<EntityType>): Promise<void> {
    this.filter = filter
  }
}
