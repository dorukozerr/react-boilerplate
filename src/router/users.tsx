import { useUsersContext } from "../context/users.context";

const Page = () => {
  const {
    usersQuery: { data, isLoading, isError, error },
  } = useUsersContext();

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
