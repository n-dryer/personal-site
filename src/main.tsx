import React from 'react';
import { createRoot } from 'react-dom/client';
import { ParallaxProvider } from 'react-scroll-parallax';
import '@fontsource/geist-sans/latin.css';
import '@fontsource/geist-mono/latin.css';
import '@fontsource/instrument-serif/latin.css';
import './styles/global.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ParallaxProvider>
      <App />
    </ParallaxProvider>
  </React.StrictMode>,
);
