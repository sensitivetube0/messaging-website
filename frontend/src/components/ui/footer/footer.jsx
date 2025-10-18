import { useNavigate } from "react-router";
import styles from "./footer.module.css";

//values are for destination - look at handleclick if a value is ommited navigation for the button wont work
export default function Footer({
  value1 = undefined,
  value2 = undefined,
  value3 = undefined,
  value4 = undefined,
}) {
  const navigate = useNavigate();
  function handleClick(iconId) {
    return iconId === 1
      ? navigate("/home")
      : iconId === 2
      ? navigate("/friends")
      : iconId === 3
      ? navigate("/send")
      : iconId === 4
      ? navigate("/messages")
      : null;
  }
  return (
    <div className={styles.container}>
      <button className={styles.icon} onClick={() => handleClick(value1)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="24"
          viewBox="0 0 22 24"
          fill="none"
        >
          <path
            d="M0 24V8L10.6667 0L21.3333 8V24H13.3333V14.6667H8V24H0Z"
            fill="black"
          />
        </svg>
        <div className={styles.text}>HOME</div>
      </button>
      <button className={styles.icon} onClick={() => handleClick(value2)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
        >
          <path
            d="M10.6667 10.6667C9.2 10.6667 7.94445 10.1444 6.9 9.1C5.85556 8.05556 5.33333 6.8 5.33333 5.33333C5.33333 3.86667 5.85556 2.61111 6.9 1.56667C7.94445 0.522222 9.2 0 10.6667 0C12.1333 0 13.3889 0.522222 14.4333 1.56667C15.4778 2.61111 16 3.86667 16 5.33333C16 6.8 15.4778 8.05556 14.4333 9.1C13.3889 10.1444 12.1333 10.6667 10.6667 10.6667ZM0 21.3333V17.6C0 16.8444 0.194667 16.1502 0.584 15.5173C0.973334 14.8844 1.48978 14.4009 2.13333 14.0667C3.51111 13.3778 4.91111 12.8613 6.33333 12.5173C7.75556 12.1733 9.2 12.0009 10.6667 12C12.1333 11.9991 13.5778 12.1716 15 12.5173C16.4222 12.8631 17.8222 13.3796 19.2 14.0667C19.8444 14.4 20.3613 14.8836 20.7507 15.5173C21.14 16.1511 21.3342 16.8453 21.3333 17.6V21.3333H0Z"
            fill="black"
          />
        </svg>
        <div className={styles.text}>FRIENDS</div>
      </button>
      <button className={styles.icon} onClick={() => handleClick(value3)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="22"
          viewBox="0 0 26 22"
          fill="none"
        >
          <path
            d="M0 21.3333V13.3333L10.6667 10.6667L0 8V0L25.3333 10.6667L0 21.3333Z"
            fill="black"
          />
        </svg>
        <div className={styles.text}>SEND</div>
      </button>
      <button className={styles.icon} onClick={() => handleClick(value4)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="20"
          viewBox="0 0 21 20"
          fill="none"
        >
          <path
            d="M19.75 18.75V0.75H0.75V12.75H12.75L19.75 18.75Z"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className={styles.text}>MESSAGES</div>
      </button>
    </div>
  );
}
