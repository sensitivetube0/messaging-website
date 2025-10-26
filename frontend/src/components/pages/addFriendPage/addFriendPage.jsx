import Header from "../../ui/header/header";
import InputField from "../../ui/inputFields/inputField";
import Button from "../../partials/buttons/priamryButton";
import styles from "./addFriendPage.module.css";
import { useNavigation, useActionData, Form } from "react-router-dom";
import Footer from "../../ui/footer/footer";

export default function AddFriend() {
  const actionData = useActionData();
  const navigation = useNavigation();

  //make form a Form and use actionData if user doesn't exist or error
  return (
    <>
      <div className={styles.main}>
        <Header />
        <Form method="POST">
          <InputField
            field={"addFriend"}
            placeholder={"friendsUsername"}
            type={"text"}
            label={"Friends Username"}
          />
          <div className={styles.button}>
            <Button
              type={"submit"}
              content={"ADD FRIEND"}
              disabled={navigation.state === "submitting"}
            ></Button>
          </div>
          <div className={styles.errMessage}>{actionData?.message}</div>
        </Form>
      </div>
      <Footer value1={1} value2={2} value3={3} value4={4} />
    </>
  );
}
