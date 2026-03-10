import { extendTheme } from '@mui/joy/styles';

import { darkColorVariables, neutralColorVariables } from './generateColor';
import light from './light';

declare module '@mui/joy/styles' {
  interface Palette {
    background: {
      channel: string;
    };
  }
}

const joyTheme = extendTheme({
  fontFamily: {
    body: "-apple-system, BlinkMacSystemFont, 'Segoe UI Variable Text', 'Segoe UI', Roboto, Noto Sans, Helvetica Neue, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
    display:
      "Lexend, -apple-system, BlinkMacSystemFont, 'Segoe UI Variable Display', 'Segoe UI', Roboto, Noto Sans, Helvetica Neue, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'"
  },
  typography: {
    h1: {
      fontFamily: 'var(--joy-fontFamily-display)',
      fontWeight: 'var(--joy-fontWeight-md)'
    },
    h2: {
      fontFamily: 'var(--joy-fontFamily-display)',
      fontWeight: 'var(--joy-fontWeight-md)'
    },
    h3: {
      fontFamily: 'var(--joy-fontFamily-display)'
    },
    h4: {
      fontFamily: 'var(--joy-fontFamily-display)'
    },
    'title-lg': {
      fontFamily: 'var(--joy-fontFamily-display)'
    },
    'title-md': {
      fontFamily: 'var(--joy-fontFamily-display)'
    },
    'title-sm': {
      fontFamily: 'var(--joy-fontFamily-display)'
    }
  },
  colorSchemes: {
    light: {
      palette: {
        background: {
          channel: '255 255 255'
        },
        primary: darkColorVariables('primary', light.primary),
        neutral: neutralColorVariables('neutral', light.neutral),
        success: darkColorVariables('success', light.green),
        danger: darkColorVariables('danger', light.red),
        warning: darkColorVariables('warning', light.amber)
      }
    }
  },
  components: {
    JoyCard: {
      styleOverrides: {
        root: {
          boxShadow: 'var(--joy-shadow-md)'
        }
      }
    }
  }
});

export default joyTheme;
