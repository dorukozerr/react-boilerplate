import { createContext, useContext, type ReactNode } from "react";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";

interface PostsContextProps {
  postQuery: UseQueryResult<
    {
      id: number;
      title: string;
      body: string;
      userId: number;
    }[],
    Error
  >;
}

const PostsContext = createContext<PostsContextProps | undefined>(undefined);

export const PostsProvider = ({ children }: { children: ReactNode }) => {
  const postQuery = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const request = await fetch("https://jsonplaceholder.typicode.com/posts");
      return await request.json();
    },
  });

  return (
    <PostsContext.Provider
      value={{
        postQuery,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePostsContext = () => {
  const context = useContext(PostsContext);

  if (context === undefined)
    throw new Error("usePostsContext must be used within an PostsProvider");

  return context;
};
