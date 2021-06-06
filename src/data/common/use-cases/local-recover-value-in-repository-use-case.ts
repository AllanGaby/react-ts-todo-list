import { RecoverValueInRepositoryUseCase, RecoverValueRepository } from '@/domain/common'

export class LocalRecoverValueInRepositoryUseCase<ValueType> implements RecoverValueInRepositoryUseCase<ValueType> {
  constructor (
    private readonly recoverValueRepository: RecoverValueRepository<ValueType>
  ) {}

  async recoverValue (key: string): Promise<ValueType | string> {
    return await this.recoverValueRepository.recover(key)
  }
}
