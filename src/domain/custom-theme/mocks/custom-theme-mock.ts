import { ThemeModel } from '@/domain/custom-theme'
import faker from 'faker'

export const mockThemeModel = (): ThemeModel => {
  return faker.random.arrayElement([ThemeModel.dark, ThemeModel.light])
}
