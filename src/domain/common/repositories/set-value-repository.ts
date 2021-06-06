export interface SetValueRepository<ValueType> {
  set: (key: string, value: ValueType) => Promise<ValueType>
}
