import { HttpClient, HttpRequest, HttpResponse } from '@/data/common/protocols'
import axios, { AxiosResponse } from 'axios'

export class AxiosHttpClient implements HttpClient {
  async request <ResponseBodyType = any>(data: HttpRequest): Promise<HttpResponse<ResponseBodyType>> {
    let axiosResponse: AxiosResponse
    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: data.headers
      })
    } catch (error) {
      axiosResponse = error.response
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }
}
