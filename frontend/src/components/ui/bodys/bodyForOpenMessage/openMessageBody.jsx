import styles from "./openMessageBody.module.css";
import HeadingDiv from "../../../partials/styleDivs/headingDiv";
import ContentDiv from "../../../partials/styleDivs/contentDiv";
import BackButton from "../../../partials/buttons/backButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { deleteMessage } from "../../../../../apiCalls";
export default function OpenMessageBody({ from, message, messageId }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      const res = await deleteMessage(messageId);
      navigate(-1);
    } catch (err) {
      console.error(`Error deleting message ${err}`);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <div className={styles.containerHeading}>
        <HeadingDiv content={from} />
      </div>
      <div className={styles.message}>
        <ContentDiv content={message} />
      </div>
      <div className={styles.backButton}>
        <BackButton
          content1={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="19"
              viewBox="0 0 22 19"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21 17.918C18.5533 14.9313 16.3807 13.2367 14.482 12.834C12.5833 12.4313 10.7757 12.3705 9.059 12.6515V18L1 9.2725L9.059 1V6.0835C12.2333 6.1085 14.932 7.24733 17.155 9.5C19.3777 11.7527 20.6593 14.5587 21 17.918Z"
                fill="black"
                stroke="black"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          }
          disabled={loading}
          content2={"BACK"}
          onClickFn={handleClick}
        />
      </div>
    </>
  );
}
