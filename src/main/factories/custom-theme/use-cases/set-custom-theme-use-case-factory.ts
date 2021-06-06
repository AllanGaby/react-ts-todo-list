import { SetValueInRepositoryUseCase } from '@/domain/common'
import { LocalSetValueInRepositoryUseCase } from '@/data/common/use-cases'
import { LocalStorageRepository } from '@/infra/common/repositories'
import { ThemeModel } from '@/domain/custom-theme'

export const makeSetCustomThemeUseCase = (): SetValueInRepositoryUseCase<ThemeModel> => {
  return new LocalSetValueInRepositoryUseCase<ThemeModel>(
    new LocalStorageRepository<ThemeModel>()
  )
}
