import { RemoteChangeTaskToConcludedUseCase } from './remote-change-task-to-concluded-use-case'
import { mockEntityModel } from '@/domain/common'
import { HttpClientSpy, mockHttpResponse } from '@/data/common/mocks'
import { HttpMethod, HttpStatusCode } from '@/data/common/protocols'
import { UnexpectedError, EntityNotFoundError } from '@/data/common/errors'
import faker from 'faker'

type sutTypes = {
  sut: RemoteChangeTaskToConcludedUseCase
  httpClient: HttpClientSpy
  endPoint: string
  entityId: string
}

const makeSut = (): sutTypes => {
  const httpClient = new HttpClientSpy()
  httpClient.httpResponse = mockHttpResponse(HttpStatusCode.ok)
  const endPoint = faker.internet.url()
  const sut = new RemoteChangeTaskToConcludedUseCase(endPoint, httpClient)
  return {
    sut,
    endPoint,
    httpClient,
    entityId: faker.random.uuid()
  }
}

describe('RemoteDeleteEntityUseCase', () => {
  test('Should call HttpClient with correct protocol', async () => {
    const { sut, httpClient, entityId } = makeSut()
    await sut.update(entityId)
    expect(httpClient.httpRequest.method).toBe(HttpMethod.put)
  })

  test('Should call HttpClient with correct url', async () => {
    const { sut, httpClient, endPoint, entityId } = makeSut()
    await sut.update(entityId)
    expect(httpClient.httpRequest.url).toBe(`${endPoint}/${entityId}/concluded`)
  })

  test('Should call HttpClient with correct body', async () => {
    const { sut, httpClient, entityId } = makeSut()
    await sut.update(entityId)
    expect(httpClient.httpRequest.body).toEqual(undefined)
  })

  test('Should return a entity if HttpClient returns ok status code', async () => {
    const { sut, httpClient, entityId } = makeSut()
    const value = mockEntityModel()
    httpClient.httpResponse = mockHttpResponse(HttpStatusCode.ok, value)
    const result = await sut.update(entityId)
    expect(result).toEqual(value)
  })

  test('Should return EntityNotFoundError if HttpClient returns notFound status code', async () => {
    const { sut, httpClient, entityId } = makeSut()
    httpClient.httpResponse = mockHttpResponse(HttpStatusCode.notFound)
    const responsePromise = sut.update(entityId)
    await expect(responsePromise).rejects.toThrowError(EntityNotFoundError)
  })

  test('Should return UnexpectedError if HttpClient returns other status code', async () => {
    const { sut, httpClient, entityId } = makeSut()
    httpClient.httpResponse = mockHttpResponse(faker.random.arrayElement([
      HttpStatusCode.badRequest,
      HttpStatusCode.forbidden,
      HttpStatusCode.created,
      HttpStatusCode.noContent,
      HttpStatusCode.serverError
    ]))
    const responsePromise = sut.update(entityId)
    await expect(responsePromise).rejects.toThrowError(UnexpectedError)
  })
})
