import ReactDOM, { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('root') as HTMLElement;

const root = createRoot(container);

root.render(
  // <div style={{ height: 800, width: 1900, border: '1px solid red' }}>
  <ChakraProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ChakraProvider>

  // </div>
);
