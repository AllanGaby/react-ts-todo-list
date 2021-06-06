import { SetValueInRepositoryUseCase, SetValueRepository } from '@/domain/common'

export class LocalSetValueInRepositoryUseCase<ValueType> implements SetValueInRepositoryUseCase<ValueType> {
  constructor (
    private readonly setValueRepository: SetValueRepository<ValueType>
  ) {}

  async setValue (key: string, value: ValueType): Promise<ValueType> {
    return await this.setValueRepository.set(key, value)
  }
}
