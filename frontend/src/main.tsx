import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.scss';
import { store } from '@/app/store';
import Home from '@/router/pages/Home';
import RootLayout from '@/router/RootLayout';
import Dictionary from '@/router/pages/Dictionary';
import UserRepetitions from '@/router/pages/UserRepetitions';
import ErrorPage from '@/router/pages/ErrorPage';
import AuthLayout from '@/router/AuthLayout';
import NewUserForm from '@/features/user/NewUserForm';
import AuthForm from '@/features/auth/AuthForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/dictionary',
        element: <Dictionary />,
      },
      {
        path: '/sign-up',
        element: <NewUserForm />,
      },
      {
        path: '/login',
        element: <AuthForm />,
      },
      {
        path: '/',
        element: <AuthLayout />,
        children: [
          {
            path: '/user-repetitions',
            element: <UserRepetitions />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
