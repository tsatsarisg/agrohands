import { Link } from "react-router";

const WORKERS = [{ id: 1, name: "George" }];

const Workers = () => {
  return (
    <>
      <ul>
        {WORKERS.map((worker) => (
          <li key={worker.id}>
            <Link to={`${worker.id}`}>{worker.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export { Workers };
