import Header from "../../ui/header/header";
import OpenMessageBody from "../../ui/bodys/bodyForOpenMessage/openMessageBody";
import styles from "./openMessage.module.css";
import { useLoaderData } from "react-router";
export default function OpenMessage() {
  const loaderData = useLoaderData();
  const messageInfo = loaderData.messageToUser;

  return (
    <div className={styles.container}>
      <Header />
      <OpenMessageBody
        from={`FROM: ${messageInfo.from.username}`}
        message={messageInfo.message}
        messageId={messageInfo.id}
      />
    </div>
  );
}
