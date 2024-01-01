import { createBrowserRouter } from 'react-router-dom';
import HomePage from '@/pages/protected/Home';
import ProfilePage from '@/pages/protected/Profile';
import Layout from '@/containers/Layout';
import AboutPage from '@/pages/protected/About';
import Login from '@/pages/Login';
import CreateListingPage from '@/pages/protected/CreateListing';
import UpdateListingPage from '@/pages/protected/UpdateListing';

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
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/create-listing',
        element: <CreateListingPage />,
      },
      {
        path: '/update-listing/:id',
        element: <UpdateListingPage />,
      },
    ],
  },
]);
