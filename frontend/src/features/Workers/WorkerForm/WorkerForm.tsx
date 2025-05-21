import {
  useLocation,
  useNavigate,
  useParams,
  useRouteLoaderData,
} from "react-router";
import classes from "./WorkerForm.module.css";
import { Worker } from "../../../types";
import { deleteWorker, upsertWorker } from "../../../api/Worker";
import LocationInput from "../../../components/LocationInput/LocationInput";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../api/fetchData";

const WorkerForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { pathname } = useLocation();
  const isNewWorker = pathname.endsWith("new") && !id;
  const title = isNewWorker ? "WORKER FORM" : "WORKER PROFILE EDIT";
  const data = useRouteLoaderData<Worker>("worker-profile")!;

  const onCancel = () => {
    navigate("/workers");
  };

  const { mutate: upsertMutate, isPending } = useMutation({
    mutationFn: upsertWorker,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workers"], exact: false });
      navigate("/workers");
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    upsertMutate({ id, data: validateWorkerForm(form) });
  }

  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteWorker,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workers"],
      });
      navigate("/workers");
    },
  });

  function handleDelete() {
    if (id) deleteMutate(id);
  }

  return (
    <form onSubmit={handleSubmit} className={classes.workerForm}>
      {!isNewWorker && (
        <div className=" flex justify-end">
          <button
            className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1  rounded-md"
            onClick={handleDelete}
          >
            {"Delete Worker"}
          </button>
        </div>
      )}

      <h2 className={classes.formTitle}>{title}</h2>
      <div className={classes.controlRow}>
        <div className={classes.control}>
          <label htmlFor="worker-title">Worker Title</label>
          <input
            type="text"
            id="worker-title"
            name="worker-title"
            defaultValue={data?.title}
          />
        </div>
      </div>

      <div className={classes.controlRow}>
        <div className={classes.control}>
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            name="first-name"
            defaultValue={data?.firstName}
          />
        </div>

        <div className={classes.control}>
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            name="last-name"
            defaultValue={data?.lastName}
          />
        </div>
      </div>

      <div className={classes.controlRow}>
        <div className={classes.control}>
          <label htmlFor="location">Location</label>
          <LocationInput defaultValue={data?.location} />
        </div>
      </div>

      <div className={classes.control}>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={data?.description}
        />
      </div>

      <fieldset>
        <legend>Skills</legend>
        <div className={classes.control}>
          <input
            type="checkbox"
            id="lugging"
            name="skills"
            value="lugging"
            defaultChecked={data?.skills.includes("lugging")}
          />
          <label htmlFor="lug">Lugging</label>
        </div>

        <div className={classes.control}>
          <input
            type="checkbox"
            id="equipment"
            name="skills"
            value="equipment"
            defaultChecked={data?.skills.includes("equipment")}
          />
          <label htmlFor="equipment">Equipment operation</label>
        </div>

        <div className={classes.control}>
          <input
            type="checkbox"
            id="harvesting"
            name="skills"
            value="harvesting"
            defaultChecked={data?.skills.includes("harvesting")}
          />
          <label htmlFor="harvesting">Harvesting</label>
        </div>
      </fieldset>

      <p className={classes.formActions}>
        <button
          type="button"
          className={classes.buttonFlat}
          onClick={onCancel}
          disabled={isPending}
        >
          Cancel
        </button>
        <button className={classes.button} disabled={isPending}>
          Save
        </button>
      </p>
    </form>
  );
};

const validateWorkerForm = (form: HTMLFormElement) => {
  const data = new FormData(form);

  const title = data.get("worker-title")?.toString();
  const firstName = data.get("first-name")?.toString();
  const lastName = data.get("last-name")?.toString();
  const location = data.get("location")?.toString();
  const description = data.get("description")?.toString();
  const skills = data.getAll("skills") as string[];

  const workerData = {
    title,
    firstName,
    lastName,
    location,
    skills,
    description,
  };

  return workerData;
};

export default WorkerForm;
