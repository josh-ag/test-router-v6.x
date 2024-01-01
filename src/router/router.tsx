import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../pages";
import { RootLayout } from "../Components/rootLayout";
import { ErrorElement } from "../Components/errorElement";
import { BlogPage, loader as blogPostLoader } from "../pages/blog";
import { BlogPostPage, actions as PostAction } from "../pages/blogPost";
import { BlogLayout } from "../Components/blogLayout";
import { PostDetails, loader as postDetailsLoader } from "../pages/postDetails";

export const Router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorElement />,
    element: <RootLayout />,
    children: [
      { element: <HomePage />, index: true },
      {
        path: "blogs",
        element: <BlogLayout />,

        children: [
          { element: <BlogPage />, index: true, loader: blogPostLoader },
          {
            element: <PostDetails />,
            path: "post/:id",
            loader: postDetailsLoader,
          },
          { path: "create", element: <BlogPostPage />, action: PostAction },
        ],
      },
    ],
  },
]);
