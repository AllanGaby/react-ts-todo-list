import { HttpRequest, HttpResponse } from '.'

export interface HttpClient {
  request: <ResponseBodyType = any>(data: HttpRequest) => Promise<HttpResponse<ResponseBodyType>>
}
