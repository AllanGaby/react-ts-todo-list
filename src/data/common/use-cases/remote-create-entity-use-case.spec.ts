import { RemoteCreateEntityUseCase } from './remote-create-entity-use-case'
import { EntityModel, mockEntityModel } from '@/domain/common'
import { HttpClientSpy, mockHttpResponse } from '@/data/common/mocks'
import { HttpMethod, HttpStatusCode } from '@/data/common/protocols'
import { ConflictOnCreateEntityError, UnauthorizedError, UnexpectedError, UnprocessableEntityError } from '@/data/common/errors'
import faker from 'faker'

type sutTypes = {
  sut: RemoteCreateEntityUseCase<EntityModel, EntityModel>
  httpClient: HttpClientSpy
  endPoint: string
  entityName: string
}

const makeSut = (): sutTypes => {
  const httpClient = new HttpClientSpy()
  httpClient.httpResponse = mockHttpResponse(HttpStatusCode.created, mockEntityModel())
  const endPoint = faker.internet.url()
  const entityName = faker.database.column()
  const sut = new RemoteCreateEntityUseCase<EntityModel, EntityModel>(endPoint, httpClient, entityName)
  return {
    sut,
    endPoint,
    httpClient,
    entityName
  }
}

describe('RemoteCreateEntityUseCase', () => {
  test('Should call HttpClient with correct protocol', async () => {
    const { sut, httpClient } = makeSut()
    await sut.create(mockEntityModel())
    expect(httpClient.httpRequest.method).toBe(HttpMethod.post)
  })

  test('Should call HttpClient with correct url', async () => {
    const { sut, httpClient, endPoint } = makeSut()
    await sut.create(mockEntityModel())
    expect(httpClient.httpRequest.url).toBe(endPoint)
  })

  test('Should call HttpClient with correct body', async () => {
    const { sut, httpClient } = makeSut()
    const request = mockEntityModel()
    await sut.create(request)
    expect(httpClient.httpRequest.body).toEqual(request)
  })

  test('Should return a created entity if HttpClient returns Created status code', async () => {
    const { sut, httpClient } = makeSut()
    const createdEntity = mockEntityModel()
    httpClient.httpResponse = mockHttpResponse(HttpStatusCode.created, createdEntity)
    const response = await sut.create(mockEntityModel())
    expect(response).toEqual(createdEntity)
  })

  test('Should return undefined if HttpClient returns noContent status code', async () => {
    const { sut, httpClient } = makeSut()
    httpClient.httpResponse = mockHttpResponse(HttpStatusCode.noContent)
    const response = await sut.create(mockEntityModel())
    expect(response).toBeFalsy()
  })

  test('Should return ConflictOnCreateEntityError if HttpClient returns Conflict status code', async () => {
    const { sut, httpClient } = makeSut()
    httpClient.httpResponse = mockHttpResponse(HttpStatusCode.conflict)
    const responsePromise = sut.create(mockEntityModel())
    await expect(responsePromise).rejects.toThrowError(ConflictOnCreateEntityError)
  })

  test('Should return UnprocessableEntityError if HttpClient returns UnprocessableEntity status code', async () => {
    const { sut, httpClient } = makeSut()
    httpClient.httpResponse = mockHttpResponse(HttpStatusCode.unprocessableEntity)
    const responsePromise = sut.create(mockEntityModel())
    await expect(responsePromise).rejects.toThrowError(UnprocessableEntityError)
  })

  test('Should return UnauthorizedError if HttpClient returns Unauthorized status code', async () => {
    const { sut, httpClient } = makeSut()
    httpClient.httpResponse = mockHttpResponse(HttpStatusCode.unauthorized)
    const responsePromise = sut.create(mockEntityModel())
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
    const responsePromise = sut.create(mockEntityModel())
    await expect(responsePromise).rejects.toThrowError(UnexpectedError)
  })
})
