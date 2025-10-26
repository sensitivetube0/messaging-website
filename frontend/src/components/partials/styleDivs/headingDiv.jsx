import styles from "./headingDiv.module.css";

export default function HeadingDiv({ content }) {
  return <h2 className={styles.heading}>{content}</h2>;
}
