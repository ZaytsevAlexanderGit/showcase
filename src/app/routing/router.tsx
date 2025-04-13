import { createBrowserRouter, createHashRouter, Navigate } from 'react-router';

import { Routes } from '../../shared/config/router';
import {
  Index,
  ProductsPage,
  //   ProductInfoPage,
  //   ProductCreatePage,
  NotFoundPage,
  ProductInfoPage,
} from '../../pages';

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
        { path: Routes.CREATE_PRODUCT, element: <h1>CREATE</h1> },
        { path: Routes.NOT_FOUND, element: <NotFoundPage /> },
      ],
    },
  ]
  // { basename: '/EcoAlpha' }
);

// { path: Routes.PRODUCT, element: <ProductInfoPage /> },
// { path: Routes.CREATE_PRODUCT, element: <ProductCreatePage /> },
