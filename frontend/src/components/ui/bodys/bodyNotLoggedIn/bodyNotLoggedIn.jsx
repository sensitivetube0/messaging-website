import Button from "../../../partials/buttons/forHomeWhenNotLoggedIn/custoumButton";
import NotLoggedInDiv from "../../../partials/styleDivs/notLoggedInDiv";
import styles from "./bodyNotLoggedIn.module.css";
import { useNavigate } from "react-router-dom";
export default function BodyNotLoggedIn() {
  const navigate = useNavigate();
  function handleClickSignup() {
    return navigate("/signup");
  }
  function handleClickLogin() {
    return navigate("/login");
  }
  return (
    <div className={styles.container}>
      <NotLoggedInDiv content={"Login or Signup"} />
      <Button
        content={"LOGIN"}
        type={"tertiary"}
        size="1.5rem"
        onClickFn={handleClickLogin}
      />

      <Button
        className={styles.button}
        content={"SIGNUP"}
        type={"tertiary"}
        size="1.5rem"
        onClickFn={handleClickSignup}
      ></Button>
    </div>
  );
}
