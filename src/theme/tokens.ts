import { Platform } from 'react-native';

export const COLORS = {
  bg: '#090A0D',
  rail: '#0D0E12',
  surface: '#12141A',
  surfaceElevated: '#181B23',
  surfaceHover: '#1F232E',
  border: 'rgba(255, 255, 255, 0.06)',
  borderStrong: 'rgba(255, 255, 255, 0.12)',
  borderAccent: 'rgba(16, 185, 129, 0.28)',
  textPrimary: '#F4F4F6',
  textSecondary: '#9499A6',
  textTertiary: '#636875',
  textInverse: '#070A0D',
  accent: '#10B981',
  accentBright: '#34D399',
  accentDeep: '#059669',
  accentSoft: 'rgba(16, 185, 129, 0.10)',
  accentMuted: 'rgba(16, 185, 129, 0.18)',
  warning: '#F59E0B',
  warningSoft: 'rgba(245, 158, 11, 0.10)',
  danger: '#EF4444',
  dangerSoft: 'rgba(239, 68, 68, 0.10)',
  info: '#38BDF8',
  infoSoft: 'rgba(56, 189, 248, 0.10)',
};

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  pill: 999,
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const FONT_FAMILY = {
  sans: Platform.OS === 'web' ? 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' : undefined,
  mono: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
};
