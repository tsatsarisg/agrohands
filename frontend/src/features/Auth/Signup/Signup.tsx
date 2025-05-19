import { Form, useActionData, useNavigation } from "react-router";
import styles from "../Auth.module.css";

const Signup = () => {
  const error = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Form method={"post"} className={styles.authForm}>
      <div className={styles.formField}>
        <label htmlFor="fullName" className={styles.formLabel}>
          Full Name
        </label>
        <input
          type="text"
          name="fullName"
          id="fullName"
          className={styles.formInput}
          required
        />
      </div>
      <div className={styles.formField}>
        <label htmlFor="email" className={styles.formLabel}>
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className={styles.formInput}
          required
        />
      </div>
      <div className={styles.formField}>
        <label htmlFor="password" className={styles.formLabel}>
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className={styles.formInput}
          required
        />
      </div>
      {error && (
        <div className="mb-4 p-1 bg-red-100 border border-red-300 text-red-600 rounded-md">
          {error.message}
        </div>
      )}
      <button disabled={isSubmitting} className={styles.submitButton}>
        Sign Up
      </button>
    </Form>
  );
};

export default Signup;
