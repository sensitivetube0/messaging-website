import styles from "./primaryButton.module.css";

export default function Button({
  content,
  type,
  onClickFn = undefined,
  disabled,
}) {
  function handleClick(e) {
    console.log(e.target);
  }
  if (!onClickFn) {
    onClickFn = handleClick;
  }
  return (
    <button
      type={type}
      className={styles.button}
      onClick={(e) => onClickFn(e)}
      disabled={disabled}
    >
      {content}
    </button>
  );
}
