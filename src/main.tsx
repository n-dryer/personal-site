import React from 'react';
import { createRoot } from 'react-dom/client';
import { ParallaxProvider } from 'react-scroll-parallax';
import './styles/global.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ParallaxProvider>
      <App />
    </ParallaxProvider>
  </React.StrictMode>
);
