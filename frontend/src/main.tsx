import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import App from './App';
import './index.scss';
import apiSlice from './app/api/apiSlice';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApiProvider api={apiSlice}>
      <RouterProvider router={router} />
    </ApiProvider>
  </React.StrictMode>,
);
