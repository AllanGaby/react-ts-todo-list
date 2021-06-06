import { HttpMethod } from '@/data/common/protocols'

export type HttpRequest<BodyType = any, HeaderType = any> = {
  url: string
  method: HttpMethod
  body?: BodyType
  headers?: HeaderType
}
