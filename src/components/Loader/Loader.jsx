
import styles from "./Loader.module.css";

const Loader = ({ message = "Processing your request..." }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.spinner}></div>
      <p className={styles.message}>{message}</p>
    </div>
  );
};

export default Loader;
