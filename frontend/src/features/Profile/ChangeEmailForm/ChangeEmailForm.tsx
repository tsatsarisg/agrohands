import classes from "../Form.module.css";
import { useActionState } from "react";
import { emailAction } from "./util";

interface ChangeEmailFormProps {
  email: string;
}

const ChangeEmailForm = ({ email }: ChangeEmailFormProps) => {
  const [formEmailState, formEmailAction] = useActionState(emailAction, {
    errors: [],
    enteredValues: {
      newEmail: undefined,
    },
    isSubmitted: false,
  });

  const previousEmail =
    formEmailState.isSubmitted && formEmailState.errors.length === 0
      ? formEmailState.enteredValues.newEmail
      : email;

  const defaultNewEmail =
    formEmailState.isSubmitted && formEmailState.errors.length === 0
      ? ""
      : formEmailState.enteredValues.newEmail;

  return (
    <form action={formEmailAction} className={classes.form}>
      <div>
        <label htmlFor="current-email" className={classes.label}>
          Current Email
        </label>
        <input
          type="email"
          id="current-email"
          name="current-email"
          disabled
          value={previousEmail}
          className={`${classes.input} ${classes.inputDisabled}`}
        />
      </div>
      <div>
        <label htmlFor="new-email" className={classes.label}>
          New Email
        </label>
        <input
          type="email"
          id="new-email"
          name="new-email"
          placeholder="Enter your new email"
          defaultValue={defaultNewEmail}
          className={classes.input}
        />
      </div>
      {formEmailState.errors.length > 0 && (
        <div className="text-red-500 mt-1">
          {formEmailState.errors.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      )}
      <button className={classes.button}>Update Email</button>
    </form>
  );
};

export default ChangeEmailForm;
