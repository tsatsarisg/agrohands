import { useRouteLoaderData } from "react-router";
import classes from "./Profile.module.css";
import { emailAction, passwordAction } from "./util";
import { useActionState } from "react";

const ProfilePage = () => {
  const { email } = useRouteLoaderData<{ email: string }>("profile-page")!;

  const [formEmailState, formEmailAction] = useActionState(emailAction, {
    errors: [],
    enteredValues: {
      newEmail: undefined,
    },
    isSubmitted: false,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [formPasswordState, formPasswordAction] = useActionState(
    passwordAction,
    {
      errors: [],
      enteredValues: {
        currentPassword: undefined,
        newPassword: undefined,
        confirmNewPassword: undefined,
      },
      isSubmitted: false,
    }
  );

  const previousEmail =
    formEmailState.isSubmitted && formEmailState.errors.length === 0
      ? formEmailState.enteredValues.newEmail
      : email;

  const defaultNewEmail =
    formEmailState.isSubmitted && formEmailState.errors.length === 0
      ? ""
      : formEmailState.enteredValues.newEmail;
  return (
    <div className={classes.container}>
      <section className={classes.section}>
        <h2 className={classes.sectionTitle}>Update Email</h2>
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
          <button className={`${classes.button} ${classes.updateButton}`}>
            Update Email
          </button>
        </form>
      </section>

      <section className={classes.section}>
        <h2 className={classes.sectionTitle}>Change Password</h2>
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
          <button className={`${classes.button} ${classes.passwordButton}`}>
            Change Password
          </button>
        </form>
      </section>
    </div>
  );
};

export default ProfilePage;
