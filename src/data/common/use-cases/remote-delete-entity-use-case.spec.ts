import { RemoteDeleteEntityUseCase } from './remote-delete-entity-use-case'
import { EntityModel, mockEntityModel } from '@/domain/common'
import { HttpClientSpy, mockHttpResponse } from '@/data/common/mocks'
import { HttpMethod, HttpStatusCode } from '@/data/common/protocols'
import { ConflictOnCreateEntityError, UnauthorizedError, UnexpectedError, UnprocessableEntityError } from '@/data/common/errors'
import faker from 'faker'

type sutTypes = {
  sut: RemoteDeleteEntityUseCase<EntityModel>
  httpClient: HttpClientSpy
  endPoint: string
  entityName: string
}

const makeSut = (): sutTypes => {
  const httpClient = new HttpClientSpy()
  httpClient.httpResponse = mockHttpResponse(HttpStatusCode.noContent)
  const endPoint = faker.internet.url()
  const entityName = faker.database.column()
  const sut = new RemoteDeleteEntityUseCase<EntityModel>(endPoint, httpClient, entityName)
  return {
    sut,
    endPoint,
    httpClient,
    entityName
  }
}

describe('RemoteDeleteEntityUseCase', () => {
  test('Should call HttpClient with correct protocol', async () => {
    const { sut, httpClient } = makeSut()
    await sut.delete(mockEntityModel())
    expect(httpClient.httpRequest.method).toBe(HttpMethod.delete)
  })

  test('Should call HttpClient with correct url', async () => {
    const { sut, httpClient, endPoint } = makeSut()
    await sut.delete(mockEntityModel())
    expect(httpClient.httpRequest.url).toBe(endPoint)
  })

  test('Should call HttpClient with correct body', async () => {
    const { sut, httpClient } = makeSut()
    await sut.delete(mockEntityModel())
    expect(httpClient.httpRequest.body).toEqual(undefined)
  })

  test('Should return undefined if HttpClient returns noContent status code', async () => {
    const { sut, httpClient } = makeSut()
    httpClient.httpResponse = mockHttpResponse(HttpStatusCode.noContent)
    const response = await sut.delete(mockEntityModel())
    expect(response).toBeFalsy()
  })

  test('Should return ConflictOnCreateEntityError if HttpClient returns Conflict status code', async () => {
    const { sut, httpClient } = makeSut()
    httpClient.httpResponse = mockHttpResponse(HttpStatusCode.conflict)
    const responsePromise = sut.delete(mockEntityModel())
    await expect(responsePromise).rejects.toThrowError(ConflictOnCreateEntityError)
  })

  test('Should return UnprocessableEntityError if HttpClient returns UnprocessableEntity status code', async () => {
    const { sut, httpClient } = makeSut()
    httpClient.httpResponse = mockHttpResponse(HttpStatusCode.unprocessableEntity)
    const responsePromise = sut.delete(mockEntityModel())
    await expect(responsePromise).rejects.toThrowError(UnprocessableEntityError)
  })

  test('Should return UnauthorizedError if HttpClient returns Unauthorized status code', async () => {
    const { sut, httpClient } = makeSut()
    httpClient.httpResponse = mockHttpResponse(HttpStatusCode.unauthorized)
    const responsePromise = sut.delete(mockEntityModel())
    await expect(responsePromise).rejects.toThrowError(UnauthorizedError)
  })

  test('Should return UnexpectedError if HttpClient returns other status code', async () => {
    const { sut, httpClient } = makeSut()
    httpClient.httpResponse = mockHttpResponse(faker.random.arrayElement([
      HttpStatusCode.badRequest,
      HttpStatusCode.forbidden,
      HttpStatusCode.notFound,
      HttpStatusCode.serverError
    ]))
    const responsePromise = sut.delete(mockEntityModel())
    await expect(responsePromise).rejects.toThrowError(UnexpectedError)
  })
})
