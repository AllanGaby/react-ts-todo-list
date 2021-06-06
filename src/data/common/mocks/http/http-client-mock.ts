import { HttpClient, HttpRequest, HttpResponse } from '@/data/common/protocols'
import { mockHttpResponse } from '@/data/common/mocks'

export class HttpClientSpy implements HttpClient {
  httpRequest: HttpRequest<any>
  httpResponse: HttpResponse<any> = mockHttpResponse()

  async request (data: HttpRequest<any>): Promise<HttpResponse<any>> {
    this.httpRequest = data
    return this.httpResponse
  }
}
