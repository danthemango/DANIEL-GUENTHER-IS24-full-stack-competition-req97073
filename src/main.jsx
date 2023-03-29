import React from 'react'
import ReactDOM from 'react-dom/client'
import SidebarWithHeader, {
  loader as rootLoader,
  action as rootAction
} from './routes/root';
import { action as destroyAction } from './routes/destroy';
import { ChakraProvider } from '@chakra-ui/react';

import ErrorPage from './error-page';
import Contact, { loader as contactLoader, action as contactAction } from './routes/contact';
import EditContact, {action as editAction} from './routes/edit';
import Index from './routes/index';
import ProductsTablePage, { loader as productsLoader } from './routes/products/list';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SidebarWithHeader />,
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
            path: "project",
            element: <ProductsTablePage />,
            loader: productsLoader,
          },
          // {
          //   path: "project/:projectId",
          //   element: <Project />
          // },
          // {
          //   path: "project/:projectId/edit",
          //   element: <ProjectEdit />
          // },
          // {
          //   path: "project/:projectId/delete",
          //   element: <ProjectDelete />
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
