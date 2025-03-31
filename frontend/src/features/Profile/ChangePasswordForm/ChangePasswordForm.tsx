import classes from "../Form.module.css";
import { useActionState } from "react";
import { passwordAction } from "./util";

const ChangePasswordForm = () => {
  const [, formPasswordAction] = useActionState(passwordAction, {
    errors: [],
    enteredValues: {
      currentPassword: undefined,
      newPassword: undefined,
      confirmNewPassword: undefined,
    },
    isSubmitted: false,
  });
  return (
    <form className={classes.form} action={formPasswordAction}>
      <div>
        <label htmlFor="current-password" className={classes.label}>
          Current Password
        </label>
        <input
          type="password"
          id="current-password"
          name="current-password"
          placeholder="Enter your current password"
          className={classes.input}
        />
      </div>
      <div>
        <label htmlFor="new-password" className={classes.label}>
          New Password
        </label>
        <input
          type="password"
          id="new-password"
          name="new-password"
          placeholder="Enter your new password"
          className={classes.input}
        />
      </div>
      <div>
        <label htmlFor="confirm-password" className={classes.label}>
          Confirm New Password
        </label>
        <input
          type="password"
          id="confirm-password"
          name="confirm-password"
          placeholder="Confirm your new password"
          className={classes.input}
        />
      </div>
      <button className={classes.button}>Change Password</button>
    </form>
  );
};

export default ChangePasswordForm;
