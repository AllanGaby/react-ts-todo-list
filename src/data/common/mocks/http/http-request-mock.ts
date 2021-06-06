import { HttpRequest, HttpMethod } from '@/data/common/protocols'
import faker from 'faker'

export const mockHttpRequest = (): HttpRequest => ({
  url: faker.internet.url(),
  method: faker.random.arrayElement([HttpMethod.get, HttpMethod.post, HttpMethod.put, HttpMethod.delete, HttpMethod.patch]),
  body: faker.random.objectElement(),
  headers: faker.random.objectElement()
})
