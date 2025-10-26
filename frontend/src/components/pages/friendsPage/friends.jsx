import Header from "../../ui/header/header";
import BodyForAddFriend from "../../ui/bodys/bodyForFriend/bodyForFriend";
import Footer from "../../ui/footer/footer";
import styles from "./friends.module.css";
import { useLoaderData } from "react-router";
export default function Friends() {
  const userObj = useLoaderData();
  const username = userObj.user.username;
  return (
    <>
      <div className={styles.container}>
        <Header />
        <BodyForAddFriend username={username} />
      </div>
      <Footer value1={1} value3={3} value4={4} />
    </>
  );
}
