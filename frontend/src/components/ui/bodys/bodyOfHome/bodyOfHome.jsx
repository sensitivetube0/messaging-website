import styles from "./bodyOfHome.module.css";

export default function BodyHome({ content }) {
  return (
    <div className={styles.container}>
      <div className={styles.text}>{content}</div>
    </div>
  );
}
