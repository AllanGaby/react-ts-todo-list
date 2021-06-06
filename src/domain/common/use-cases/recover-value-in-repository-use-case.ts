export interface RecoverValueInRepositoryUseCase<ValueType> {
  recoverValue: (key: string) => Promise<ValueType | string>
}
