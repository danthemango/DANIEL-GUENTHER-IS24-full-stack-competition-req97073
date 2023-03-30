import React from 'react'
import ReactDOM from 'react-dom/client'
import RootPage, {
  loader as rootLoader,
  action as rootAction
} from './routes/root';
import { action as destroyAction } from './routes/destroy';
import { ChakraProvider } from '@chakra-ui/react';

import ErrorPage from './error-page';
import ProductView, { loader as productLoader, action as productAction } from './routes/product/view';
import Contact, { loader as contactLoader, action as contactAction } from './routes/contact';
import EditContact, {action as editAction} from './routes/edit';
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
            path: "product/:productId",
            element: <ProductView />,
            loader: productLoader,
            action: productAction,
          },
          // {
          //   path: "product/:productId/edit",
          //   element: <ProductEdit />
          // },
          // {
          //   path: "product/:prodictId/delete",
          //   element: <ProductDelete />
          // },
          {
            path: "contacts/:contactId",
            element: <Contact />,
            loader: contactLoader,
            action: contactAction,
          },
          {
            path: "contacts/:contactId/edit",
            element: <EditContact />,
            loader: contactLoader,
            action: editAction,
          },
          {
            path: "contacts/:contactId/destroy",
            action: destroyAction,
            errorElement: <div>Oops! There was an error.</div>,
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
