import { RouterProvider } from 'react-router';

import { router } from './router';

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};
