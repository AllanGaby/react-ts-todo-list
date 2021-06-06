import React, { createContext, PropsWithChildren, useContext, useState, useCallback, useEffect } from 'react'
import { ThemeModel } from '@/domain/custom-theme'
import { SetValueInRepositoryUseCase, RecoverValueInRepositoryUseCase } from '@/domain/common'
import { ThemeProvider, DefaultTheme } from 'styled-components'
import { DarkTheme, LightTheme } from '@/presentation/styles/themes'

type CustomThemeContextData = {
  customTheme: ThemeModel
  toggleTheme: () => void
}

const CustomThemeContext = createContext<CustomThemeContextData>({
  customTheme: undefined,
  toggleTheme: undefined
})

type CustomThemeProviderProps = {
  setThemeUseCase: SetValueInRepositoryUseCase<ThemeModel>
  getThemeUseCase: RecoverValueInRepositoryUseCase<ThemeModel>
  themeKey: string
}

type CustomThemeProviderPropsWithChildren = PropsWithChildren<CustomThemeProviderProps>

const CustomThemeProvider: React.FC<CustomThemeProviderPropsWithChildren> = ({ getThemeUseCase, setThemeUseCase, themeKey, children }: CustomThemeProviderPropsWithChildren) => {
  const [customTheme, setCustomThemeState] = useState<ThemeModel>()
  const [theme, setTheme] = useState<DefaultTheme>()

  useEffect(() => {
    const getCustomThemeStateAsync = async (): Promise<void> => {
      const theme = await getThemeUseCase.recoverValue(themeKey) as ThemeModel
      if (theme) {
        setCustomThemeState(theme)
        if (theme === ThemeModel.dark) {
          setTheme(DarkTheme)
        } else {
          setTheme(LightTheme)
        }
      } else {
        await setThemeUseCase.setValue(themeKey, ThemeModel.dark)
        setTheme(DarkTheme)
      }
    }
    getCustomThemeStateAsync()
  }, [])

  const handleToggleTheme = useCallback(async () => {
    const selectedTheme = await getThemeUseCase.recoverValue(themeKey) as ThemeModel
    if (selectedTheme === ThemeModel.dark) {
      setCustomThemeState(ThemeModel.light)
      await setThemeUseCase.setValue(themeKey, ThemeModel.light)
      setTheme(LightTheme)
    } else {
      setCustomThemeState(ThemeModel.dark)
      await setThemeUseCase.setValue(themeKey, ThemeModel.dark)
      setTheme(DarkTheme)
    }
  }, [])

  return (
    <CustomThemeContext.Provider value={{ customTheme, toggleTheme: handleToggleTheme }}>
      {theme &&
      <ThemeProvider theme={theme} >
        {children}
      </ThemeProvider>}
    </CustomThemeContext.Provider>)
}

const useCustomTheme = (): CustomThemeContextData => {
  const context = useContext(CustomThemeContext)

  if (!context) {
    throw new Error('useCustomTheme must be used within an CustomThemeProvider')
  }

  return context
}

export { CustomThemeProvider, useCustomTheme }
