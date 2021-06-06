import { SetValueRepository } from '@/domain/common'

export class SetValueRepositorySpy<ValueType> implements SetValueRepository<ValueType> {
  key: string
  value: ValueType
  result: ValueType

  async set (key: string, value: ValueType): Promise<ValueType> {
    this.key = key
    this.value = value
    return this.result
  }
}
