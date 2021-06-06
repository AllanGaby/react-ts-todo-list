import { HttpResponse, HttpStatusCode } from '@/data/common/protocols'
import faker from 'faker'

export const mockHttpResponse = <BodyType = any>(
  statusCode: HttpStatusCode = HttpStatusCode.ok,
  body: BodyType = faker.random.objectElement<BodyType>()): HttpResponse => ({
  body,
  statusCode
})
