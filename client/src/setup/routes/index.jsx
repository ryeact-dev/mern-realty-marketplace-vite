import { createBrowserRouter } from 'react-router-dom';
import HomePage from '@/pages/protected/Home';
import ProfilePage from '@/pages/protected/Profile';
import Layout from '@/containers/Layout';
import AboutPage from '@/pages/protected/About';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
      {
        path: '/about',
        element: <AboutPage />,
      },
    ],
  },
]);
