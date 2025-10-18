import styles from "./notLoggedInDiv.module.css";

export default function NotLoggedInDiv({ content }) {
  return <div className={styles.div}>{content}</div>;
}
