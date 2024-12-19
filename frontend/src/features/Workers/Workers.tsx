import { Link, useLoaderData } from "react-router";
import { Worker } from "../../types";

const Workers = () => {
  const workers = useLoaderData<Worker[]>();

  return (
    <>
      <ul>
        {workers.map((worker) => (
          <li key={worker.id}>
            <Link to={worker.id}>
              <span>{worker.firstName}</span>
              <span>{worker.lastName}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export { Workers };
