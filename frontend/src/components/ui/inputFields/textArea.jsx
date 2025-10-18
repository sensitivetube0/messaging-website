import styles from "./textArea.module.css";

export default function TextArea({ label, name, rows, cols }) {
  return (
    <div className={styles.textArea}>
      <label htmlFor={name}>{label}</label>
      <textarea name={name} id={name} rows={rows} cols={cols}></textarea>
    </div>
  );
}
