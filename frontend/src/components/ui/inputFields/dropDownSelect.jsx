import styles from "./dropDownSelect.module.css";

export default function DropDownMenu({ name, label, options }) {
  return (
    <div className={styles.container}>
      <label htmlFor={name}>{label}</label>
      <select name={name} id={name}>
        {options.map((o) => {
          return <option>{o}</option>;
        })}
      </select>
    </div>
  );
}
