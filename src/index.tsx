import React from 'react'
import ReactDOM from 'react-dom/client'
import  './firebaseServices/firebase';
import App from './App'
import reportWebVitals from './reportWebVitals';
import GlobalStyle from 'ui/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import theme from 'ui/Utils/Media/Theme/theme';
import { registerServiceWorker } from 'pwa';
import { Workbox } from 'workbox-window';
registerServiceWorker();
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
if ('serviceWorker' in navigator) {
  const workbox = new Workbox('/service-worker.js');
  workbox.register();
}
root.render(
  <React.StrictMode>
    <GlobalStyle/>
    <ThemeProvider theme={theme}>
     <App />
    </ThemeProvider>
  </React.StrictMode>,
);

reportWebVitals();
