import { createContext, useContext, type ReactNode } from "react";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";

interface UsersContextProps {
  usersQuery: UseQueryResult<
    {
      id: number;
      name: string;
      email: string;
    }[],
    Error
  >;
}
const UsersContext = createContext<UsersContextProps | undefined>(undefined);

export const UsersProvider = ({ children }: { children: ReactNode }) => {
  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const request = await fetch("https://jsonplaceholder.typicode.com/users");
      return await request.json();
    },
  });

  return (
    <UsersContext.Provider value={{ usersQuery }}>
      {children}
    </UsersContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUsersContext = () => {
  const context = useContext(UsersContext);

  if (context === undefined)
    throw new Error("useUsersContext must be used within an UsersProvider");

  return context;
};
