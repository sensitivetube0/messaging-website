export default function MessagesButton({
  content,
  type,
  onClickFn,
  messageId,
}) {
  return (
    <button type={type} onClick={() => onClickFn(messageId)}>
      {content}
    </button>
  );
}
