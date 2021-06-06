import 'styled-components'
import { CustomThemeProps } from './custom-theme'

declare module 'styled-components' {
  export interface DefaultTheme extends CustomThemeProps {}
}
