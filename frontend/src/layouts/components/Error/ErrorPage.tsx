import { useRouteError } from "react-router";
import MainNavigation from "../MainNavigation/MainNavigation";

const ErrorPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error: any = useRouteError();

  let title = "An error occured";
  let message = "Something went wrong!";
  if (error.status === 500) {
    message = JSON.parse(error.data).message;
  }

  if (error.status === 404) {
    title = "Not found!";
    message = "Could not find resource.";
  }

  return (
    <>
      <MainNavigation />
      <main>
        <h1>{title}</h1>
        <h2>{message}</h2>
      </main>
    </>
  );
};
export default ErrorPage;
