import Header from "../../ui/header/header";
import InputField from "../../ui/inputFields/inputField";
import Button from "../../partials/buttons/priamryButton";
import styles from "./addFriendPage.module.css";
import { useNavigate } from "react-router-dom";
import Footer from "../../ui/footer/footer";
export default function AddFriend() {
  const navigate = useNavigate();
  function handleSubmit(e) {
    console.log("what");
    e.preventDefault();
    return navigate("/friends");
  }
  //make form a Form and use actionData if user doesnt exist or error
  return (
    <>
      <div className={styles.main}>
        <Header />
        <form onSubmit={(e) => handleSubmit(e)}>
          <InputField
            field={"addFriend"}
            placeholder={"username"}
            type={"text"}
            label={"Friends Username"}
          />
          <div className={styles.button}>
            <Button type={"submit"} content={"ADD FRIEND"}></Button>
          </div>
        </form>
      </div>
      <Footer value1={1} value2={2} value3={3} value4={4} />
    </>
  );
}
