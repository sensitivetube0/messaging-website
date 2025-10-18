import Header from "../../ui/header/header";
import BodyForAddFriend from "../../ui/bodys/bodyForFriend/bodyForFriend";
import Footer from "../../ui/footer/footer";
import styles from "./friends.module.css";
export default function Friends() {
  return (
    <>
      <div className={styles.container}>
        <Header />
        <BodyForAddFriend />
      </div>
      <Footer value1={1} value3={3} value4={4} />
    </>
  );
}
