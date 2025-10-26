import styles from "./bodyForSend.module.css";
import TextArea from "../../inputFields/textArea";
import DropDownMenu from "../../inputFields/dropDownSelect";
import Button from "../../../partials/buttons/priamryButton";
import { Form, useNavigation, useActionData } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getFriends } from "../../../../../apiCalls";
export default function BodySend() {
  const actionData = useActionData();
  const navigation = useNavigation();
  const friendsQuery = useQuery({
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const friends = await getFriends();
      return friends;
    },
    queryKey: ["send"],
  });

  if (friendsQuery.isLoading) {
    return <div className="">Loading. . .</div>;
  }
  if (friendsQuery.isError || friendsQuery.status === "error") {
    return <div className="">ERROR PAGE</div>;
  }

  const friends = friendsQuery.data.friends;

  return (
    <div className={styles.container}>
      <Form method="POST" className={styles.inputs}>
        <DropDownMenu name={"toUsername"} label={"To"} options={friends} />

        <TextArea
          label={"Message"}
          cols={"40"}
          rows={"20"}
          name={"message"}
        ></TextArea>
        <div className={styles.button}>
          <Button
            content={"SEND MESSAGE"}
            type={"submit"}
            disabled={navigation.state === "submitting"}
          />
        </div>
        <div className={styles.error}>{actionData?.message}</div>
      </Form>
    </div>
  );
}
