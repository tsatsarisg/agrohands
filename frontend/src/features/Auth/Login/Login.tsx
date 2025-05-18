import { useActionData, useNavigate } from "react-router";
import styles from "../Auth.module.css";
import { login } from "../../../api/Auth";
import { useMutation } from "@tanstack/react-query";

const Login = () => {
  const error = useActionData();
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate("/");
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    mutate(validateLoginForm(form));
  }

  return (
    <form onSubmit={handleSubmit} className={styles.authForm}>
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
      <button className={styles.submitButton}>Login</button>
    </form>
  );
};

const validateLoginForm = (form: HTMLFormElement) => {
  const data = new FormData(form);

  const authData = {
    email: data.get("email")?.toString(),
    password: data.get("password")?.toString(),
  };

  return authData;
};

export default Login;
