import classes from "./Profile.module.css";

const ProfilePage = () => {
  return (
    <div className={classes.container}>
      <h1 className={classes.header}>Profile Settings</h1>

      {/* Update Email */}
      <section className={classes.section}>
        <h2 className={classes.sectionTitle}>Update Email</h2>
        <form className={classes.form}>
          <div>
            <label htmlFor="current-email" className={classes.label}>
              Current Email
            </label>
            <input
              type="email"
              id="current-email"
              name="current-email"
              disabled
              value="user@example.com"
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
              className={classes.input}
            />
          </div>
          <button
            type="submit"
            className={`${classes.button} ${classes.updateButton}`}
          >
            Update Email
          </button>
        </form>
      </section>

      {/* Update Password */}
      <section className={classes.section}>
        <h2 className={classes.sectionTitle}>Change Password</h2>
        <form className={classes.form}>
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
          <button
            type="submit"
            className={`${classes.button} ${classes.passwordButton}`}
          >
            Change Password
          </button>
        </form>
      </section>
    </div>
  );
};

export default ProfilePage;
