import Header from "../../ui/header/header";
import MessagesBody from "../../ui/bodys/messageBody/messagesBody";
import styles from "./messages.module.css";
import Footer from "../../ui/footer/footer";
export default function Messages() {
  return (
    <>
      <div className={styles.container}>
        <Header />
        <h2 className={styles.heading}>MESSAGES</h2>
        <MessagesBody />
      </div>
      <Footer value1={1} value2={2} value3={3} />
    </>
  );
}
