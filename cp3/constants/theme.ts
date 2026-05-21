import { Platform } from 'react-native';

export const Colors = {
  light: {
    background: '#121212',
    backgroundSecondary: '#1E1E1E',
    backgroundTertiary: '#2A2A2A',
    text: '#ffffff',
    textSecondary: '#B3B3B3',
    textDisabled: '#808080',
    tint: '#18ff10',
    icon: '#B3B3B3',
    border: '#2A2A2A',
    error: '#EF4444',
    success: '#16a35c',
  },
  dark: {
    background: '#121212',
    backgroundSecondary: '#1E1E1E',
    backgroundTertiary: '#2A2A2A',
    text: '#F5F5F5',
    textSecondary: '#B3B3B3',
    textDisabled: '#808080',
    tint: '#fff',
    icon: '#B3B3B3',
    border: '#2A2A2A',
    error: '#EF4444',
    success: '#22C55E',
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
