import React from 'react'
import ReactDOM from 'react-dom/client'
import RootPage, {
  loader as rootLoader,
  action as rootAction
} from './routes/root';
import { ChakraProvider } from '@chakra-ui/react';

import ErrorPage from './error-page';
// import ProductView, { loader as productLoader, action as productAction } from './routes/product/view';
import ProductEdit, { editLoader as productEditLoader, createLoader as productCreateLoader} from './routes/product/edit';
import Index from './routes/index';
import ProductsTablePage, { loader as productsLoader } from './routes/product/list';
import '../src/index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
      errorElement: <ErrorPage />,
      children:
        [
          {
            index: true,
            element: <Index />
          },
          {
            path: "product",
            element: <ProductsTablePage />,
            loader: productsLoader,
          },
          {
            path: "product/create",
            element: <ProductEdit />,
            loader: productCreateLoader,
          },
          {
            path: "product/edit/:productId",
            element: <ProductEdit />,
            loader: productEditLoader,
          }
        ]
      }]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
)
