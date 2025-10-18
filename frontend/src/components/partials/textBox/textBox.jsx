import styles from "./textBox.module.css";

export default function TextBox({ content }) {
  return <div className={styles.textBox}>{content}</div>;
}
