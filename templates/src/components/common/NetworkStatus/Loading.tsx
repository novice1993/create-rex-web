import styles from "./network.module.css";

export const Loading = () => {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner} />
    </div>
  );
};
