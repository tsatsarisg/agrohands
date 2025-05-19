import { Link, useRouteError } from "react-router";
import MainNavigation from "../MainNavigation/MainNavigation";
import classes from "./ErrorPage.module.css";
import rootClasses from "../../RootLayout.module.css";

const ErrorPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error: any = useRouteError();

  return (
    <div className={rootClasses.rootLayout}>
      <MainNavigation />
      <main>
        <div className={classes.container}>
          <h1 className={classes.title}>Oops! Something Went Wrong</h1>
          <p className={classes.message}>
            {error?.statusText ||
              error?.message ||
              "An unexpected error occurred."}
          </p>
          <div className={classes.actions}>
            <Link to="/" className={classes.homeButton}>
              Go to Homepage
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ErrorPage;
