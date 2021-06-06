import { RemoteUpdateEntityUseCase } from './remote-update-entity-use-case'
import { EntityModel, mockEntityModel } from '@/domain/common'
import { HttpClientSpy, mockHttpResponse } from '@/data/common/mocks'
import { HttpMethod, HttpStatusCode } from '@/data/common/protocols'
import { UnauthorizedError, UnexpectedError, UnprocessableEntityError, EntityNotFoundError } from '@/data/common/errors'
import faker from 'faker'

type sutTypes = {
  sut: RemoteUpdateEntityUseCase<EntityModel, EntityModel>
  httpClient: HttpClientSpy
  endPoint: string
  entityName: string
  entityId: string
}

const makeSut = (): sutTypes => {
  const httpClient = new HttpClientSpy()
  httpClient.httpResponse = mockHttpResponse(HttpStatusCode.ok)
  const endPoint = faker.internet.url()
  const entityName = faker.database.column()
  const sut = new RemoteUpdateEntityUseCase<EntityModel, EntityModel>(endPoint, httpClient, entityName)
  return {
    sut,
    endPoint,
    httpClient,
    entityName,
    entityId: faker.random.uuid()
  }
}

describe('RemoteDeleteEntityUseCase', () => {
  test('Should call HttpClient with correct protocol', async () => {
    const { sut, httpClient, entityId } = makeSut()
    await sut.update(entityId, mockEntityModel())
    expect(httpClient.httpRequest.method).toBe(HttpMethod.put)
  })

  test('Should call HttpClient with correct url', async () => {
    const { sut, httpClient, endPoint, entityId } = makeSut()
    await sut.update(entityId, mockEntityModel())
    expect(httpClient.httpRequest.url).toBe(`${endPoint}/${entityId}`)
  })

  test('Should call HttpClient with correct body', async () => {
    const { sut, httpClient, entityId } = makeSut()
    const request = mockEntityModel()
    await sut.update(entityId, request)
    expect(httpClient.httpRequest.body).toEqual(request)
  })

  test('Should return a entity if HttpClient returns ok status code', async () => {
    const { sut, httpClient, entityId } = makeSut()
    const value = mockEntityModel()
    httpClient.httpResponse = mockHttpResponse(HttpStatusCode.ok, value)
    const result = await sut.update(entityId, mockEntityModel())
    expect(result).toEqual(value)
  })

  test('Should return EntityNotFoundError if HttpClient returns notFound status code', async () => {
    const { sut, httpClient, entityId } = makeSut()
    httpClient.httpResponse = mockHttpResponse(HttpStatusCode.notFound)
    const responsePromise = sut.update(entityId, mockEntityModel())
    await expect(responsePromise).rejects.toThrowError(EntityNotFoundError)
  })

  test('Should return UnprocessableEntityError if HttpClient returns UnprocessableEntity status code', async () => {
    const { sut, httpClient, entityId } = makeSut()
    httpClient.httpResponse = mockHttpResponse(HttpStatusCode.unprocessableEntity)
    const responsePromise = sut.update(entityId, mockEntityModel())
    await expect(responsePromise).rejects.toThrowError(UnprocessableEntityError)
  })

  test('Should return UnauthorizedError if HttpClient returns Unauthorized status code', async () => {
    const { sut, httpClient, entityId } = makeSut()
    httpClient.httpResponse = mockHttpResponse(HttpStatusCode.unauthorized)
    const responsePromise = sut.update(entityId, mockEntityModel())
    await expect(responsePromise).rejects.toThrowError(UnauthorizedError)
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
    const responsePromise = sut.update(entityId, mockEntityModel())
    await expect(responsePromise).rejects.toThrowError(UnexpectedError)
  })
})
