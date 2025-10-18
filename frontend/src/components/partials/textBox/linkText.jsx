import { Link } from "react-router";
import styles from "./linkText.module.css";

export default function LinkText({ path, content, size }) {
  return (
    <Link to={path} className={styles.link} style={{ fontSize: size }}>
      {content}
    </Link>
  );
}
