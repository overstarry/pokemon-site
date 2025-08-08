// Design System - Minimalist design tokens for clean aesthetic

// Color palette - Refined for minimalist approach
export const colors = {
  // Primary colors - Subtle and sophisticated
  primary: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8', // Refined primary
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },

  // Secondary colors - Muted blue accents
  secondary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8', // Clean blue accent
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },

  // Success colors - Minimal green
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },

  // Warning colors - Subtle amber
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#f59e0b',
    500: '#d97706',
    600: '#b45309',
    700: '#92400e',
    800: '#78350f',
    900: '#451a03',
  },

  // Error colors - Clean red
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },

  // Neutral colors - High contrast for readability
  neutral: {
    50: '#ffffff',
    100: '#f9fafb',
    200: '#f3f4f6',
    300: '#e5e7eb',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },

  // Subtle gradients for minimal design
  gradients: {
    subtle: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    card: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
    hover: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
    dark: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    accent: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)',
  },
};

// Spacing system
export const spacing = {
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
  32: '128px',
  40: '160px',
  48: '192px',
  56: '224px',
  64: '256px',
};

// Typography system - Optimized for readability and hierarchy
export const typography = {
  fontFamily: {
    sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
    mono: ['SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'monospace'],
  },
  fontSize: {
    xs: ['12px', { lineHeight: '18px', letterSpacing: '0.025em' }],
    sm: ['14px', { lineHeight: '21px', letterSpacing: '0.025em' }],
    base: ['16px', { lineHeight: '26px', letterSpacing: '0' }],
    lg: ['18px', { lineHeight: '30px', letterSpacing: '-0.025em' }],
    xl: ['20px', { lineHeight: '32px', letterSpacing: '-0.025em' }],
    '2xl': ['24px', { lineHeight: '36px', letterSpacing: '-0.025em' }],
    '3xl': ['32px', { lineHeight: '44px', letterSpacing: '-0.05em' }],
    '4xl': ['40px', { lineHeight: '48px', letterSpacing: '-0.05em' }],
    '5xl': ['48px', { lineHeight: '54px', letterSpacing: '-0.075em' }],
    '6xl': ['64px', { lineHeight: '68px', letterSpacing: '-0.075em' }],
  },
  fontWeight: {
    thin: '100',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
};

// Shadow system
export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  glow: '0 0 20px rgb(59 130 246 / 0.5)',
  pokemon: '0 8px 32px rgb(102 126 234 / 0.3)',
};

// Border radius system
export const borderRadius = {
  none: '0px',
  sm: '2px',
  base: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
  '2xl': '16px',
  '3xl': '24px',
  full: '9999px',
};

// Animation system
export const animations = {
  duration: {
    75: '75ms',
    100: '100ms',
    150: '150ms',
    200: '200ms',
    300: '300ms',
    500: '500ms',
    700: '700ms',
    1000: '1000ms',
  },
  easing: {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
};

// Breakpoint system
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Theme configuration - Minimalist light and dark themes
export const themes = {
  light: {
    background: colors.neutral[50],
    foreground: colors.neutral[900],
    card: colors.neutral[50],
    cardForeground: colors.neutral[900],
    primary: colors.primary[700],
    primaryForeground: colors.neutral[50],
    secondary: colors.secondary[500],
    secondaryForeground: colors.neutral[50],
    muted: colors.neutral[200],
    mutedForeground: colors.neutral[600],
    accent: colors.secondary[100],
    accentForeground: colors.secondary[800],
    border: colors.neutral[200],
    input: colors.neutral[200],
    ring: colors.secondary[400],
    subtle: colors.neutral[100],
  },
  dark: {
    background: colors.neutral[900],
    foreground: colors.neutral[100],
    card: colors.neutral[800],
    cardForeground: colors.neutral[100],
    primary: colors.primary[400],
    primaryForeground: colors.neutral[900],
    secondary: colors.secondary[400],
    secondaryForeground: colors.neutral[900],
    muted: colors.neutral[700],
    mutedForeground: colors.neutral[300],
    accent: colors.secondary[800],
    accentForeground: colors.secondary[200],
    border: colors.neutral[700],
    input: colors.neutral[700],
    ring: colors.secondary[400],
    subtle: colors.neutral[800],
  },
};

// Minimalist spacing scale - More generous for clean design
export const minimalSpacing = {
  xs: '8px',
  sm: '12px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
  '4xl': '96px',
  '5xl': '128px',
};
