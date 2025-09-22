import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '@studio384/amicons/amicons.css';

import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
