import { RecoverValueInRepositoryUseCase } from '@/domain/common'

export class RecoverValueInRepositoryUseCaseSpy<ValueType> implements RecoverValueInRepositoryUseCase<ValueType> {
  key: string
  value: ValueType

  async recoverValue (key: string): Promise<ValueType> {
    this.key = key
    return this.value
  }
}
