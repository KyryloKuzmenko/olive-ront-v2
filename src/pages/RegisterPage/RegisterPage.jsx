import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { signUp } from "../../services/api";
import { SignUpValidationSchema } from "../../services/validationSchema";
import styles from "./RegisterPage.module.css";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const initialValues = {
    name: "",
    email: "",
    password: "",
    };
    
    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await signUp(values);
            navigate("/login");
        } catch (error) {
            setError(error.response?.data?.message || "Something went wrong");
        }

        setSubmitting(false);
    }

    return (
      <div className={styles.container}>
        <p className={styles.backLink}>
          <Link to="/">← Back to Home</Link>
        </p>
        <h2>Register</h2>
        {error && <p className={styles.error}>{error}</p>}
        <Formik
          initialValues={initialValues}
          validationSchema={SignUpValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className={styles.form}>
              <label>Name:</label>
              <Field type="text" name="name" />
              <ErrorMessage
                name="name"
                component="div"
                className={styles.error}
              />

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
                Register
              </button>
            </Form>
          )}
        </Formik>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    );
};

export default RegisterPage;
