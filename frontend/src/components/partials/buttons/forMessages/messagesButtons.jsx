import styles from "./messagesButton.module.css";

export default function MessagesButton({
  content,
  type,
  onClickFn,
  messageId,
  content2,
}) {
  return (
    <>
      <button
        type={type}
        onClick={() => onClickFn(messageId)}
        className={styles.button}
      >
        FROM: {content}
        <span>{content2}</span>
      </button>
    </>
  );
}
