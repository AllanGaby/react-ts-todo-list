import { RemoteListEntitiesUseCase } from './remote-list-entities-use-case'
import { EntityModel, mockEntityModel } from '@/domain/common'
import { HttpClientSpy, mockHttpResponse } from '@/data/common/mocks'
import { HttpMethod, HttpStatusCode } from '@/data/common/protocols'
import { UnauthorizedError, UnexpectedError, UnprocessableEntityError, EntityNotFoundError } from '@/data/common/errors'
import faker from 'faker'

type sutTypes = {
  sut: RemoteListEntitiesUseCase<EntityModel>
  httpClient: HttpClientSpy
  endPoint: string
  entityName: string
}

const makeSut = (): sutTypes => {
  const httpClient = new HttpClientSpy()
  httpClient.httpResponse = mockHttpResponse(HttpStatusCode.ok)
  const endPoint = faker.internet.url()
  const entityName = faker.database.column()
  const sut = new RemoteListEntitiesUseCase<EntityModel>(endPoint, httpClient, entityName)
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
    await sut.list(mockEntityModel())
    expect(httpClient.httpRequest.method).toBe(HttpMethod.get)
  })

  test('Should call HttpClient with correct url', async () => {
    const { sut, httpClient, endPoint } = makeSut()
    await sut.list(mockEntityModel())
    expect(httpClient.httpRequest.url).toBe(endPoint)
  })

  test('Should call HttpClient with correct body', async () => {
    const { sut, httpClient } = makeSut()
    await sut.list(mockEntityModel())
    expect(httpClient.httpRequest.body).toEqual(undefined)
  })

  test('Should return EntityNotFoundError if HttpClient returns notFound status code', async () => {
    const { sut, httpClient } = makeSut()
    httpClient.httpResponse = mockHttpResponse(HttpStatusCode.notFound)
    const responsePromise = sut.list(mockEntityModel())
    await expect(responsePromise).rejects.toThrowError(EntityNotFoundError)
  })

  test('Should return UnprocessableEntityError if HttpClient returns UnprocessableEntity status code', async () => {
    const { sut, httpClient } = makeSut()
    httpClient.httpResponse = mockHttpResponse(HttpStatusCode.unprocessableEntity)
    const responsePromise = sut.list(mockEntityModel())
    await expect(responsePromise).rejects.toThrowError(UnprocessableEntityError)
  })

  test('Should return UnauthorizedError if HttpClient returns Unauthorized status code', async () => {
    const { sut, httpClient } = makeSut()
    httpClient.httpResponse = mockHttpResponse(HttpStatusCode.unauthorized)
    const responsePromise = sut.list(mockEntityModel())
    await expect(responsePromise).rejects.toThrowError(UnauthorizedError)
  })

  test('Should return UnexpectedError if HttpClient returns other status code', async () => {
    const { sut, httpClient } = makeSut()
    httpClient.httpResponse = mockHttpResponse(faker.random.arrayElement([
      HttpStatusCode.badRequest,
      HttpStatusCode.forbidden,
      HttpStatusCode.created,
      HttpStatusCode.noContent,
      HttpStatusCode.serverError
    ]))
    const responsePromise = sut.list(mockEntityModel())
    await expect(responsePromise).rejects.toThrowError(UnexpectedError)
  })
})
