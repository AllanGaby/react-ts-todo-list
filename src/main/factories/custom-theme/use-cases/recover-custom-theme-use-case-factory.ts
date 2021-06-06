import { RecoverValueInRepositoryUseCase } from '@/domain/common'
import { LocalRecoverValueInRepositoryUseCase } from '@/data/common/use-cases'
import { LocalStorageRepository } from '@/infra/common/repositories'
import { ThemeModel } from '@/domain/custom-theme'

export const makeRecoverCustomThemeUseCase = (): RecoverValueInRepositoryUseCase<ThemeModel> => {
  return new LocalRecoverValueInRepositoryUseCase<ThemeModel>(
    new LocalStorageRepository<ThemeModel>()
  )
}
