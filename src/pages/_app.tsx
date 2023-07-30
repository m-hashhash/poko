import '@/src/styles/globals.css';
import { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import type { AppProps as DefaultAppProps } from 'next/app';
import createEmotionCache from '@/src/libs/createEmotionCache';
import { Inter } from 'next/font/google';
import { Provider } from 'react-redux';
import store from '@/src/store';

const interFont = Inter({
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  subsets: ['latin']
});

const clientSideEmotionCache = createEmotionCache();

interface AppProps extends DefaultAppProps {
  emotionCache?: EmotionCache;
}

const theme = createTheme({
  typography: {
    ...interFont.style
  }
});

function App(props: AppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  );
}

export default App;
