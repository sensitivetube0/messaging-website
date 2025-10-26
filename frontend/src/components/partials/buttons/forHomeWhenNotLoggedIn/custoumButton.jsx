import styles from "./custoumButton.module.css";

export default function ButtonForNotLogged({ content, onClickFn }) {
  return (
    <button
      className={styles.button}
      onClick={(e) => {
        onClickFn(e);
      }}
    >
      {content}
    </button>
  );
}
