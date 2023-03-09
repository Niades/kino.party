type Color = string
type FontFamily = string

export interface AppTheme {
  global: {
    fontFamily: FontFamily
    textColor: Color
  }
  colors: {
    windowBodyBg: Color
    windowHeaderBg: Color
    buttonPrimaryBg: Color
  }
}

const defaultTheme: AppTheme = {
  global: {
    fontFamily: 'Roboto, Arial',
    textColor: 'white',
  },
  colors: {
    windowBodyBg: '#211E2E',
    windowHeaderBg: '#211E2E',
    buttonPrimaryBg: '#FC4672',
  },
}

export { defaultTheme }
