import Header from "../../ui/header/header";
import Footer from "../../ui/footer/footer";
import BodySend from "../../ui/bodys/bodyForSend/bodyForSend";
import styles from "./sendPage.module.css";
export default function Send() {
  return (
    <div className={styles.container}>
      <Header />
      <BodySend />
      <Footer value1={1} value2={2} value4={4} />
    </div>
  );
}
