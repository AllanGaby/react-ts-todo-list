import { LocalSetValueInRepositoryUseCase } from './local-set-value-in-repository-use-case'
import { SetValueRepositorySpy } from '@/domain/common'
import faker from 'faker'

type sutTypes = {
  sut: LocalSetValueInRepositoryUseCase<object>
  setValueRepository: SetValueRepositorySpy<object>
  key: string
}

const makeSut = (): sutTypes => {
  const setValueRepository = new SetValueRepositorySpy<object>()
  setValueRepository.result = faker.random.objectElement<object>()
  const sut = new LocalSetValueInRepositoryUseCase<object>(setValueRepository)
  return {
    sut,
    setValueRepository,
    key: faker.database.column()
  }
}

describe('LocalSetValueInRepositoryUseCase', () => {
  test('Should call SetValueRepository with correct value', async () => {
    const { sut, setValueRepository, key } = makeSut()
    const value = faker.random.objectElement<object>()
    await sut.setValue(key, value)
    expect(setValueRepository.key).toBe(key)
    expect(setValueRepository.value).toEqual(value)
  })

  test('Should return same SetValueRepository returns', async () => {
    const { sut, setValueRepository, key } = makeSut()
    const value = faker.random.objectElement<object>()
    const result = await sut.setValue(key, value)
    expect(result).toEqual(setValueRepository.result)
  })
})
