import { useCommentsContext } from "../context/comments.context";

const Page = () => {
  const {
    commentsQuery: { data, isLoading, isError, error },
  } = useCommentsContext();

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
