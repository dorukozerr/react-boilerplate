import { createContext, useContext, type ReactNode } from "react";
import {
  useMutation,
  type UseMutationResult,
  // useQueryClient
} from "@tanstack/react-query";

interface CreatePostPayload {
  title: string;
  body: string;
  userId: number;
}

interface MutationsContextProps {
  createPostMutation: UseMutationResult<
    CreatePostPayload & { id: number },
    Error,
    CreatePostPayload,
    unknown
  >;
}

const MutationsContext = createContext<MutationsContextProps | undefined>(
  undefined
);

export const MutationsProvider = ({ children }: { children: ReactNode }) => {
  //   const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationKey: ["toggleStoryBookmarkMutation"],
    mutationFn: async (payload: CreatePostPayload) => {
      const request = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!request.ok) throw new Error((await request.json()).error);

      return (await request.json()) as CreatePostPayload & { id: number };
    },
    onError: ({ message }) => {
      // display toast message with retry button maybe
      // toast.error(message)
      console.error(message);
    },
  });

  return (
    <MutationsContext.Provider
      value={{
        createPostMutation,
      }}
    >
      {children}
    </MutationsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useMutationsContext = () => {
  const context = useContext(MutationsContext);

  if (context === undefined)
    throw new Error(
      "useMutationsContext must be used within an MutationsProvider"
    );

  return context;
};
