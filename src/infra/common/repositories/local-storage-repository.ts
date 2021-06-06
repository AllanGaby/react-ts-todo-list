import { SetValueRepository, RecoverValueRepository } from '@/domain/common'

export class LocalStorageRepository<ValueType> implements SetValueRepository<ValueType>, RecoverValueRepository<ValueType> {
  async set (key: string, value: ValueType): Promise<ValueType> {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value))
      return value
    }
    localStorage.removeItem(key)
    return undefined
  }

  async recover (key: string): Promise<ValueType | string> {
    const result = localStorage.getItem(key)
    if (result) {
      try {
        return JSON.parse(result)
      } catch {
        return result
      }
    }
    return undefined
  }
}
