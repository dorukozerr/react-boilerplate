import { lazy, Suspense, type ComponentType } from "react";
import { type RouteObject } from "react-router-dom";

import { Layout } from "../components/layout";
import { PostsProvider } from "../context/posts.context";
import { CommentsProvider } from "../context/comments.context";
import { UsersProvider } from "../context/users.context";

const Posts = lazy(() => import("./posts"));
const Comments = lazy(() => import("./comments"));
const Users = lazy(() => import("./users"));

const withSuspense = (Component: ComponentType) => (
  <Suspense
    fallback={
      <div className="w-full h-full flex justify-center items-center">
        <h3>Loading...</h3>
      </div>
    }
  >
    <Component />
  </Suspense>
);

export const routerConfig: RouteObject[] = [
  {
    path: "/",
    element: (
      <PostsProvider>
        <Layout>{withSuspense(Posts)}</Layout>
      </PostsProvider>
    ),
  },
  {
    path: "/comments",
    element: (
      <CommentsProvider>
        <Layout>{withSuspense(Comments)}</Layout>
      </CommentsProvider>
    ),
  },
  {
    path: "/users",
    element: (
      <UsersProvider>
        <Layout>{withSuspense(Users)}</Layout>
      </UsersProvider>
    ),
  },
];
