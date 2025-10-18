import styles from "./boxDiv.module.css";

export default function BoxDiv({ content, icon }) {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.content}>{content}</div>
    </div>
  );
}
