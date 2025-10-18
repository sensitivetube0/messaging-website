import styles from "./inputField.module.css";

export default function InputField({ field, placeholder, label, type }) {
  return (
    <div className={styles.container}>
      <label htmlFor={field} className={styles.label}>
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        name={field}
        className={styles.input}
      />
    </div>
  );
}
