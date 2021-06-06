export interface SetValueInRepositoryUseCase<ValueType> {
  setValue: (key: string, value: ValueType) => Promise<ValueType>
}
