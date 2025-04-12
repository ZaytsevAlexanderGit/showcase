import { createBrowserRouter, createHashRouter, Navigate } from 'react-router';

import { Routes } from '../../shared/config/router';
import {
  Index,
  ProductsPage,
  //   ProductInfoPage,
  //   ProductCreatePage,
  NotFoundPage,
} from '../../pages';

export const router = createHashRouter(
  // export const router = createBrowserRouter(
  [
    {
      path: Routes.ROOT,
      element: <Index />,
      children: [
        { index: true, element: <Navigate to="/products" /> },
        { path: Routes.ALL_PRODUCTS, element: <ProductsPage /> },
        { path: Routes.PRODUCT_INFO, element: <h1>Some Product</h1> },
        { path: Routes.CREATE_PRODUCT, element: <h1>CREATE</h1> },
        { path: Routes.NOT_FOUND, element: <NotFoundPage /> },
      ],
    },
  ]
  // { basename: '/EcoAlpha' }
);

// { index: true, element: <ProductsPage /> },
// { path: Routes.PRODUCT, element: <ProductInfoPage /> },
// { path: Routes.CREATE_PRODUCT, element: <ProductCreatePage /> },
