import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import Posts, { loader as postsLoader } from './routes/Posts';
import NewPost, { action as newPostAction } from './routes/NewPost';
import RootLayout from './routes/RootLayout';

import './index.css';
import PostDetails, { loader as postDetailsLoader } from './routes/PostDetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Posts />,
        loader: postsLoader, //* will be triggered before the element is rendered
        children: [
          {
            path: '/create-post',
            element: <NewPost />,
            action: newPostAction, //* will be triggered when a form is submitted inside the element
          },
          {
            path: '/:id',
            element: <PostDetails />,
            loader: postDetailsLoader,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
