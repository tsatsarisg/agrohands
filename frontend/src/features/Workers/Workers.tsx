import { Link, useLoaderData } from "react-router";

const Workers = () => {
  const workers = useLoaderData<{ id: string; name: string }[]>();

  return (
    <>
      <ul>
        {workers.map((worker) => (
          <li key={worker.id}>
            <Link to={worker.id}>{worker.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export { Workers };
