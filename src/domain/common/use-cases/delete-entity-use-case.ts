import { EntityModel } from '@/domain/common'

export interface DeleteEntityUseCase<EntityType extends EntityModel> {
  delete: (filter: Partial<EntityType>) => Promise<void>
}
