import { HttpStatusCode } from './http-status-code'

export type HttpResponse<BodyType = any> = {
  body: BodyType
  statusCode: HttpStatusCode
}
