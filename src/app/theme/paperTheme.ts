import { MD3LightTheme, configureFonts, type MD3Theme } from 'react-native-paper';
import { colors } from './tokens';

const fonts = configureFonts({ config: MD3LightTheme.fonts });

export const paperTheme: MD3Theme = {
  ...MD3LightTheme,
  roundness: 8,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.blue,
    onPrimary: colors.white,
    primaryContainer: '#cdeef9',
    onPrimaryContainer: '#003544',
    secondary: colors.green,
    onSecondary: colors.white,
    secondaryContainer: '#c9f3d6',
    onSecondaryContainer: '#00391c',
    tertiary: colors.orange,
    onTertiary: colors.white,
    tertiaryContainer: '#ffe2c8',
    onTertiaryContainer: '#3d1f00',
    error: colors.red,
    onError: colors.white,
    errorContainer: '#ffdad6',
    onErrorContainer: '#410002',
    background: '#f5f7f8',
    onBackground: colors.darkGrey,
    surface: colors.white,
    onSurface: colors.darkGrey,
    surfaceVariant: '#eceff1',
    onSurfaceVariant: colors.grey,
    outline: colors.lightGreySSS,
    outlineVariant: '#e1e5e8',
    inverseSurface: '#2b3135',
    inverseOnSurface: '#f0f3f4',
    inversePrimary: '#8fd8f2',
    shadow: '#000000',
    scrim: 'rgba(7, 17, 27, 0.5)',
    backdrop: 'rgba(7, 17, 27, 0.5)',
  },
  fonts,
};
