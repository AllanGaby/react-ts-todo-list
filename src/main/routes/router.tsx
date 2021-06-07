import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { OpenningRouter } from '@/presentation/routes'
import GlobalStyle from '@/presentation/styles/global.styles'
import { CustomThemeProvider } from '@/presentation/hooks/custom-theme'
import { makeSetCustomThemeUseCase, makeRecoverCustomThemeUseCase } from '@/main/factories/custom-theme/use-cases'
import { ListTasksPageFactory } from '@/main/factories/todo-list/pages'

const Router: React.FC = () => {
  const themeKey: string = '@skeleton:theme'

  return (
    <CustomThemeProvider
      setThemeUseCase={makeSetCustomThemeUseCase()}
      getThemeUseCase={makeRecoverCustomThemeUseCase()}
      themeKey={themeKey}
    >
      <BrowserRouter>
        <GlobalStyle />
        <OpenningRouter listPage={ListTasksPageFactory} />
      </BrowserRouter>
    </CustomThemeProvider>
  )
}

export default Router
