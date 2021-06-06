export interface RecoverValueRepository<ValueType> {
  recover: (key: string) => Promise<ValueType | string>
}
