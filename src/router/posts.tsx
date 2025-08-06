import { usePostsContext } from "../context/posts.context";

const Page = () => {
  const {
    postQuery: { data, isLoading, isError, error },
  } = usePostsContext();

  return (
    <div className="w-full h-full flex justify-center items-center">
      {isLoading ? (
        <>Loading...</>
      ) : isError ? (
        error?.message ?? "Error"
      ) : data ? (
        JSON.stringify(data)
      ) : null}
    </div>
  );
};

export default Page;
