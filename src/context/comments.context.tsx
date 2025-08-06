import { createContext, useContext, type ReactNode } from "react";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";

interface CommentsContextProps {
  commentsQuery: UseQueryResult<
    {
      id: number;
      name: string;
      email: string;
    }[],
    Error
  >;
}

const CommentsContext = createContext<CommentsContextProps | undefined>(
  undefined
);

export const CommentsProvider = ({ children }: { children: ReactNode }) => {
  const commentsQuery = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const request = await fetch(
        "https://jsonplaceholder.typicode.com/comments"
      );
      return await request.json();
    },
  });

  return (
    <CommentsContext.Provider value={{ commentsQuery }}>
      {children}
    </CommentsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCommentsContext = () => {
  const context = useContext(CommentsContext);

  if (context === undefined)
    throw new Error(
      "useCommentsContext must be used within an CommentsProvider"
    );

  return context;
};
