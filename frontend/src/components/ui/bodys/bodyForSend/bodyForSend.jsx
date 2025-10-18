import styles from "./bodyForSend.module.css";
import TextArea from "../../inputFields/textArea";
import DropDownMenu from "../../inputFields/dropDownSelect";
import Button from "../../../partials/buttons/priamryButton";
import { useNavigate } from "react-router";
export default function BodySend() {
  const navigate = useNavigate();
  function handleSubmit() {
    return navigate("/home");
  }
  //make form element a Form and post a message in the action
  //make it so it fetches all friends by usin the user LoaderData in a useQuery
  const options = ["friend1", "friend2", "friend3"];
  return (
    <div className={styles.container}>
      <form action="" onSubmit={() => handleSubmit()} className={styles.inputs}>
        <DropDownMenu name={"to"} label={"To"} options={options} />

        <TextArea
          label={"Message"}
          cols={"40"}
          rows={"20"}
          name={"messages"}
        ></TextArea>
        <div className={styles.button}>
          <Button content={"SEND MESSAGE"} type={"submit"} />
        </div>
      </form>
    </div>
  );
}
