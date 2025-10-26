import styles from "./backButton.module.css";

export default function BackButton({
  content1,
  content2,
  onClickFn,
  disabled,
}) {
  return (
    <button
      onClick={(e) => onClickFn(e)}
      className={styles.backButton}
      disabled={disabled}
    >
      {content1}
      <span>{content2}</span>
    </button>
  );
}
