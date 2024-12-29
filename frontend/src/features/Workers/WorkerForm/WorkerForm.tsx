import {
  Form,
  useLocation,
  useNavigate,
  useNavigation,
  useParams,
  useRouteLoaderData,
} from "react-router";
import classes from "./WorkerForm.module.css";
import { Worker } from "../../../types";
import { useBanNewWorker } from "./hooks";
import { deleteWorker } from "../../../api/Worker";

const WorkerForm = () => {
  useBanNewWorker();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const { id } = useParams();
  const { pathname } = useLocation();
  const isSubmitting = navigation.state === "submitting";
  const data = useRouteLoaderData<Worker>("worker-profile")!;

  const onCancel = () => {
    navigate("/workers");
  };

  const onDelete = async (id: string) => {
    await deleteWorker(id);
    navigate("/workers");
  };

  const isNewWorker = pathname.endsWith("new") && !id;

  const method = isNewWorker ? "POST" : "PUT";
  const title = isNewWorker ? "WORKER FORM" : "WORKER PROFILE EDIT";

  return (
    <Form method={method} className={classes.workerForm}>
      {!isNewWorker && (
        <div className=" flex justify-end">
          <button
            className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1  rounded-md"
            onClick={() => {
              if (id) {
                onDelete(id);
              }
            }}
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
          <input
            type="text"
            id="location"
            name="location"
            defaultValue={data?.location}
          />
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
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button className={classes.button} disabled={isSubmitting}>
          Save
        </button>
      </p>
    </Form>
  );
};

export default WorkerForm;
