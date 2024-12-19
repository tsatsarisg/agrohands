import {
  Form,
  useNavigate,
  useNavigation,
  useRouteLoaderData,
} from "react-router";
import classes from "./EditWorker.module.css";
import { Worker } from "../../../types";

const EditWorkerProfile = () => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const data = useRouteLoaderData<Worker>("worker-profile")!;

  const onCancel = () => {
    navigate("..");
  };

  return (
    <Form method={"post"}>
      <h2 className={classes.formTitle}>WORKER PROFILE EDIT</h2>

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

export default EditWorkerProfile;
