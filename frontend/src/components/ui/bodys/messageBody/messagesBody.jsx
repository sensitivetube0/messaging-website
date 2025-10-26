import { useNavigate } from "react-router";
import MessagesButton from "../../../partials/buttons/forMessages/messagesButtons";
import { useQuery } from "@tanstack/react-query";
import { getMessages } from "../../../../../apiCalls";
import styles from "./messagesBody.module.css";
export default function MessagesBody() {
  //do a use query to get all the messages for that particular user
  const queryMessages = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const res = await getMessages();
      return res;
    },
  });
  const navigate = useNavigate();

  if (queryMessages.isLoading) {
    return <div className="">Loading ...</div>;
  }
  if (queryMessages.isError || queryMessages.status === "error") {
    return <div className="">ERROR PAGE</div>;
  }

  const users = queryMessages.data.messages.map((m) => {
    return { username: m.from.username, messageId: m.id };
  });

  const handleClick = (messageId) => {
    return navigate(`/open/${messageId}`);
  };

  return (
    <div className={styles.messages}>
      {users.map((u) => (
        <MessagesButton
          key={u.messageId}
          messageId={u.messageId}
          content={u.username}
          type="button"
          onClickFn={handleClick}
          content2={`Click anywhere to open`}
        />
      ))}
    </div>
  );
}
