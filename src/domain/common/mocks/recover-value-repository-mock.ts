import { RecoverValueRepository } from '@/domain/common'

export class RecoverValueRepositorySpy<ValueType> implements RecoverValueRepository<ValueType> {
  key: string
  value: ValueType

  async recover (key: string): Promise<ValueType | string> {
    this.key = key
    return this.value
  }
}
