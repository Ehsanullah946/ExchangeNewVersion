import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import './i18n.jsx';
import { Provider } from 'react-redux';
import store from './store.js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={QueryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
