import { useNavigate } from "react-router";
import MessagesButton from "../../../partials/buttons/forMessages/messagesButtons";

export default function MessagesBody() {
  //do a use query to get all the messages for that particular user
  const navigate = useNavigate();
  const users = [
    { username: "account1", fromId: 2, messageId: 1 },
    { username: "account2", fromId: 3, messageId: 2 },
    { username: "account3", fromId: 4, messageId: 3 },
  ];

  const handleClick = (messageId) => {
    return navigate(`/open/${messageId}`);
  };

  return (
    <div className="">
      {users.map((u) => (
        <MessagesButton
          key={u.messageId}
          messageId={u.fromId}
          content={u.username}
          type="button"
          onClickFn={handleClick}
        />
      ))}
    </div>
  );
}
