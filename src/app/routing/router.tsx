// import { createBrowserRouter,  Navigate } from 'react-router';
import { createHashRouter, Navigate } from 'react-router';

import { Routes } from '../../shared/config/router';
import {
  Index,
  ProductsPage,
  NotFoundPage,
  ProductInfoPage,
  ProductCreatePage,
} from '../../pages';
import { initialFormData } from '../../shared/libs/constants.ts';

export const router = createHashRouter(
  // export const router = createBrowserRouter(
  [
    {
      path: Routes.ROOT,
      element: <Index />,
      children: [
        { index: true, element: <Navigate to={Routes.ALL_PRODUCTS} /> },
        { path: Routes.ALL_PRODUCTS, element: <ProductsPage /> },
        { path: Routes.PRODUCT_INFO, element: <ProductInfoPage /> },
        {
          path: Routes.CREATE_PRODUCT,
          element: <ProductCreatePage productInformation={initialFormData} />,
        },
        { path: Routes.NOT_FOUND, element: <NotFoundPage /> },
      ],
    },
  ]
  // { basename: '/EcoAlpha' }
);
