import { LocalRecoverValueInRepositoryUseCase } from './local-recover-value-in-repository-use-case'
import { RecoverValueRepositorySpy } from '@/domain/common'
import faker from 'faker'

type sutTypes = {
  sut: LocalRecoverValueInRepositoryUseCase<object>
  recoverValueRepository: RecoverValueRepositorySpy<object>
  key: string
}

const makeSut = (): sutTypes => {
  const recoverValueRepository = new RecoverValueRepositorySpy<object>()
  recoverValueRepository.value = faker.random.objectElement<object>()
  const sut = new LocalRecoverValueInRepositoryUseCase<object>(recoverValueRepository)
  return {
    sut,
    recoverValueRepository,
    key: faker.database.column()
  }
}

describe('LocalRecoverValueInRepositoryUseCase', () => {
  test('Should call RecoverValueRepository with correct value', async () => {
    const { sut, recoverValueRepository, key } = makeSut()
    await sut.recoverValue(key)
    expect(recoverValueRepository.key).toBe(key)
  })

  test('Should return same RecoverValueRepository returns', async () => {
    const { sut, recoverValueRepository, key } = makeSut()
    const result = await sut.recoverValue(key)
    expect(result).toEqual(recoverValueRepository.value)
  })
})
