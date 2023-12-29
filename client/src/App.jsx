import { RouterProvider } from 'react-router-dom';
import { router } from './setup/routes';

export default function App() {
  return <RouterProvider router={router} />;
}
