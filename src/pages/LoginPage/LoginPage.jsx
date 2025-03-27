import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../../redux/auth/authThunk";
import { SignInValidationSchema } from "../../services/validationSchema";
import Loader from "../../components/Loader/Loader";

import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [localError, setLocalError] = useState("");
  const { loading, error } = useSelector((state) => state.auth);

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(login(values)).unwrap();
      navigate("/map");
    } catch (error) {
      setLocalError(error || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <p className={styles.backLink}>
        <Link to="/">← Back to Home</Link>
      </p>
      <h2>Login</h2>
      {localError && <p className={styles.error}>{localError}</p>}
      {error && <p className={styles.error}>{error}</p>}
      <Formik
        initialValues={initialValues}
        validationSchema={SignInValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <>
            {isSubmitting && <Loader message="Signing you in..." />}
            <Form className={styles.form}>
              <label htmlFor="email">Email:</label>
              <Field type="email" name="email" />
              <ErrorMessage
                name="email"
                component="div"
                className={styles.error}
              />

              <label>Password:</label>
              <Field type="password" name="password" />
              <ErrorMessage
                name="password"
                component="div"
                className={styles.error}
              />
              <button type="submit" disabled={isSubmitting}>
                Login
              </button>
            </Form>
          </>
        )}
      </Formik>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default LoginPage;
