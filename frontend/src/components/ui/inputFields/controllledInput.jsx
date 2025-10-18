import styles from "./controlledInput.module.css";

export default function ControlledInput({
  state,
  setState,
  name,
  label,
  type,
  placeHolder,
}) {
  function handleChange(value) {
    setState(value);
  }
  return (
    <div className={styles.container}>
      <label htmlFor={name}>{label}</label>
      <input
        className={styles.input}
        type={type}
        name={name}
        id={name}
        value={state}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeHolder}
      />
    </div>
  );
}
