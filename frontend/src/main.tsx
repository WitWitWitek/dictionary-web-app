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
import LoginPage from '@/router/pages/LoginPage';
import SignUpPage from './router/pages/SignupPage';
import Dashboard from './router/pages/Dashboard';
import UserProfile from './router/pages/UserProfile';
import ConfirmUser from './router/pages/ConfirmUser';

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
        element: <SignUpPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/confirm',
        element: <ConfirmUser />,
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: '/user-profile',
            element: <UserProfile />,
          },
          {
            path: '/user-repetitions',
            element: <UserRepetitions />,
          },
          {
            path: '/dashboard',
            element: <Dashboard />,
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
