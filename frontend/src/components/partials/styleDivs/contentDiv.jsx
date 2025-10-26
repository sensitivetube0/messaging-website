import styles from "./contentDiv.module.css";

export default function ContentDiv({ content }) {
  return <div className={styles.content}>{content}</div>;
}
