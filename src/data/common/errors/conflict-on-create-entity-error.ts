export class ConflictOnCreateEntityError extends Error {
  constructor (entity: string) {
    super(`Conflict on create ${entity}`)
    this.name = 'ConflictOnCreateEntityError'
  }
}
