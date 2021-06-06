import { SetValueInRepositoryUseCase } from '@/domain/common'

export class SetValueInRepositoryUseCaseSpy<ValueType> implements SetValueInRepositoryUseCase<ValueType> {
  key: string
  value: ValueType
  result: ValueType

  async setValue (key: string, value: ValueType): Promise<ValueType> {
    this.key = key
    this.value = value
    return this.result
  }
}
