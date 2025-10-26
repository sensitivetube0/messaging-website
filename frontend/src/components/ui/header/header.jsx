import Logo from "../../partials/logo";
import styles from "./header.module.css";
import TextBox from "../../partials/textBox/textBox";
function Header() {
  return (
    <div className={styles.container}>
      <Logo />
      <TextBox content={"INSTANT MESSENGER"} />
    </div>
  );
}

export default Header;
