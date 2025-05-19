import { useRouteLoaderData } from "react-router";
import classes from "./ProfileSettings.module.css";
import ChangeEmailForm from "../../features/Profile/ChangeEmailForm/ChangeEmailForm";
import ChangePasswordForm from "../../features/Profile/ChangePasswordForm/ChangePasswordForm";

const ProfileSettingsPage = () => {
  const { email } = useRouteLoaderData("root");

  return (
    <div className={classes.container}>
      <section className={classes.section}>
        <h2 className={classes.sectionTitle}>Update Email</h2>
        <ChangeEmailForm email={email} />
      </section>

      <section className={classes.section}>
        <h2 className={classes.sectionTitle}>Change Password</h2>
        <ChangePasswordForm />
      </section>
    </div>
  );
};

export default ProfileSettingsPage;
