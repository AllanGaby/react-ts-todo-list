import { HttpClient } from '@/data/common/protocols'
import { AxiosHttpClient } from '@/infra/common/http'

export const makeHttpClient = (): HttpClient => {
  return new AxiosHttpClient()
}
