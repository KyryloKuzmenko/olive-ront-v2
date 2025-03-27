import { Link } from "react-router-dom";
import styles from "./WelcomePage.module.css";

function WelcomePage() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Welcome</h1>
      <div className={styles.buttons}>
        <Link to="/login" className={styles.btn}>
          Login
        </Link>
        <Link to="/register" className={styles.btn}>
          Register
        </Link>
      </div>
    </div>
  );
}

export default WelcomePage;
