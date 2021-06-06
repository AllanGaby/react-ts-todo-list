import { LocalStorageRepository } from './local-storage-repository'
import 'jest-localstorage-mock'
import faker from 'faker'

type sutTypes = {
  sut: LocalStorageRepository<object>
  key: string
}

const makeSut = (): sutTypes => ({
  sut: new LocalStorageRepository<object>(),
  key: faker.random.uuid()
})

describe('LocalStorageRepository', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('Set Method', () => {
    test('Should call setItem with correct value if value is provided', async () => {
      const { sut, key } = makeSut()
      const setItemSpy = jest.spyOn(localStorage, 'setItem')
      const value = faker.random.objectElement<object>()
      await sut.set(key, value)
      expect(setItemSpy).toHaveBeenCalledWith(key, JSON.stringify(value))
    })

    test('Should return same value provided if setItem is succeeds', async () => {
      const { sut, key } = makeSut()
      const value = faker.random.objectElement<object>()
      const result = await sut.set(key, value)
      expect(result).toEqual(value)
    })

    test('Should call removeItem if value is undefined', async () => {
      const { sut, key } = makeSut()
      const removeItemSpy = jest.spyOn(localStorage, 'removeItem')
      await sut.set(key, undefined)
      expect(removeItemSpy).toHaveBeenCalledWith(key)
    })
  })

  describe('Recover Value', () => {
    test('Should call getItem with correct key', async () => {
      const { sut, key } = makeSut()
      const getItemSpy = jest.spyOn(localStorage, 'getItem')
      await sut.recover(key)
      expect(getItemSpy).toHaveBeenCalledWith(key)
    })

    test('Should return same value of LocalStorage return', async () => {
      const { sut, key } = makeSut()
      const value = faker.random.objectElement<object>()
      jest.spyOn(localStorage, 'getItem').mockReturnValue(JSON.stringify(value))
      const result = await sut.recover(key)
      expect(result).toEqual(value)
    })

    test('Should return string if of LocalStorage dont can cast the value', async () => {
      const { sut, key } = makeSut()
      const value = faker.random.words()
      jest.spyOn(localStorage, 'getItem').mockReturnValue(value)
      const result = await sut.recover(key)
      expect(result).toEqual(value)
    })
  })
})
