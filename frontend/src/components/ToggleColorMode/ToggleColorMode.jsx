import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Create a context for theme mode
export const ThemeModeContext = React.createContext({
  mode: 'light',    // Default value
  setMode: () => {}, // Default setter (dummy function for context initialization)
});

export default function ToggleColorMode({ children }) {
  const [themeMode, setThemeMode] = React.useState(() => {
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
    return systemPreference;
  });

  React.useEffect(() => {
    const systemPreferenceListener = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (themeMode === 'system') {
        setThemeMode(systemPreferenceListener.matches ? 'dark' : 'light');
      }
    };
    systemPreferenceListener.addEventListener('change', handleChange);
    return () => systemPreferenceListener.removeEventListener('change', handleChange);
  }, [themeMode]);

  const nightTheme = {
    palette: {
      mode: 'dark',
      background: {
        default: '#0A0A0A',
        paper: '#151515',
      },
      text: {
        default: '#C0C0C0',
        secondary: '#A0A0A0',
      }
    }
  };

  const darkTheme = {
    palette: {
      mode: 'dark',
      background: {
        default: '#1f1f1f',
        paper: '#1E1E1E',
      },
      text: {
        default: '#C0C0C0',
        secondary: '#A0A0A0',
      },
    },
  };

  const lightTheme = {
    palette: {
      mode: 'light',
    },
  };

  const getTheme = (mode) => {
    if (mode === 'system') {
      const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return createTheme(systemDarkMode ? darkTheme : lightTheme);
    } else if (mode === 'night') {
      return createTheme(nightTheme)
    }
    return createTheme(mode === 'dark' ? darkTheme : lightTheme);
  };

  return (
    <ThemeModeContext.Provider value={{ mode: themeMode, setMode: setThemeMode }}>
      <ThemeProvider theme={getTheme(themeMode)}>
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}
