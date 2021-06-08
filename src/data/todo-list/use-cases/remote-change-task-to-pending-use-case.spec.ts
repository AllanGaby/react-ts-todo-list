import { RemoteChangeTaskToPendingUseCase } from './remote-change-task-to-pending-use-case'
import { mockTaskModel, mockChangeTaskToPendingDTO } from '@/domain/todo-list'
import { HttpClientSpy, mockHttpResponse } from '@/data/common/mocks'
import { HttpMethod, HttpStatusCode } from '@/data/common/protocols'
import { UnexpectedError, EntityNotFoundError, UnprocessableEntityError, UnauthorizedError, AccessDeniedError } from '@/data/common/errors'
import faker from 'faker'

type sutTypes = {
  sut: RemoteChangeTaskToPendingUseCase
  httpClient: HttpClientSpy
  endPoint: string
}

const makeSut = (): sutTypes => {
  const httpClient = new HttpClientSpy()
  httpClient.httpResponse = mockHttpResponse(HttpStatusCode.ok)
  const endPoint = faker.internet.url()
  const sut = new RemoteChangeTaskToPendingUseCase(endPoint, httpClient)
  return {
    sut,
    endPoint,
    httpClient
  }
}

describe('RemoteChangeTaskToPendingUseCase', () => {
  test('Should call HttpClient with correct protocol', async () => {
    const { sut, httpClient } = makeSut()
    await sut.update(mockChangeTaskToPendingDTO())
    expect(httpClient.httpRequest.method).toBe(HttpMethod.put)
  })

  test('Should call HttpClient with correct url', async () => {
    const { sut, httpClient, endPoint } = makeSut()
    const request = mockChangeTaskToPendingDTO()
    await sut.update(request)
    expect(httpClient.httpRequest.url).toBe(`${endPoint}/${request.id}/pending`)
  })

  test('Should call HttpClient with correct body', async () => {
    const { sut, httpClient } = makeSut()
    const request = mockChangeTaskToPendingDTO()
    await sut.update(request)
    expect(httpClient.httpRequest.body).toEqual({
      password: request.password
    })
  })

  test('Should return a entity if HttpClient returns ok status code', async () => {
    const { sut, httpClient } = makeSut()
    const value = mockTaskModel()
    httpClient.httpResponse = mockHttpResponse(HttpStatusCode.ok, value)
    const result = await sut.update(mockChangeTaskToPendingDTO())
    expect(result).toEqual(value)
  })

  test('Should return EntityNotFoundError if HttpClient returns notFound status code', async () => {
    const { sut, httpClient } = makeSut()
    httpClient.httpResponse = mockHttpResponse(HttpStatusCode.notFound)
    const responsePromise = sut.update(mockChangeTaskToPendingDTO())
    await expect(responsePromise).rejects.toThrowError(EntityNotFoundError)
  })

  test('Should return AccessDeniedError if HttpClient returns forbidden status code', async () => {
    const { sut, httpClient } = makeSut()
    httpClient.httpResponse = mockHttpResponse(HttpStatusCode.forbidden)
    const responsePromise = sut.update(mockChangeTaskToPendingDTO())
    await expect(responsePromise).rejects.toThrowError(AccessDeniedError)
  })

  test('Should return UnprocessableEntityError if HttpClient returns UnprocessableEntity status code', async () => {
    const { sut, httpClient } = makeSut()
    httpClient.httpResponse = mockHttpResponse(HttpStatusCode.unprocessableEntity)
    const responsePromise = sut.update(mockChangeTaskToPendingDTO())
    await expect(responsePromise).rejects.toThrowError(UnprocessableEntityError)
  })

  test('Should return UnauthorizedError if HttpClient returns Unauthorized status code', async () => {
    const { sut, httpClient } = makeSut()
    httpClient.httpResponse = mockHttpResponse(HttpStatusCode.unauthorized)
    const responsePromise = sut.update(mockChangeTaskToPendingDTO())
    await expect(responsePromise).rejects.toThrowError(UnauthorizedError)
  })

  test('Should return UnexpectedError if HttpClient returns other status code', async () => {
    const { sut, httpClient } = makeSut()
    httpClient.httpResponse = mockHttpResponse(faker.random.arrayElement([
      HttpStatusCode.badRequest,
      HttpStatusCode.created,
      HttpStatusCode.noContent,
      HttpStatusCode.serverError
    ]))
    const responsePromise = sut.update(mockChangeTaskToPendingDTO())
    await expect(responsePromise).rejects.toThrowError(UnexpectedError)
  })
})
