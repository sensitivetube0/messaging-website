import { useState } from "react";
import ControlledInput from "../../inputFields/controllledInput";
import FriendsList from "../../../partials/lists/friendsList";
import Button from "../../../partials/buttons/priamryButton";
import styles from "./bodyForFriend.module.css";
import { useNavigate } from "react-router";
export default function BodyForAddFriend() {
  const navigate = useNavigate();
  function handleClick() {
    return navigate("/addfriend");
  }
  const [search, setSearch] = useState("");

  const friends = ["username1", "username2", "username3"];
  //would do a react query here to get the friends for of the user to display useQuery also when search change would dynamically rerun use querywith the search so the friends list keeps updating would even have to handle a submit this just keeps rerending on search change! example this works
  const searchFriends = friends.filter(
    (f) => f.startsWith(search) || f === search
  );
  return (
    <>
      <div className={styles.inputCon}>
        <ControlledInput
          state={search}
          setState={setSearch}
          name={"search"}
          placeHolder={"Search ..."}
        />
        <div className={styles.buttonCon}>
          <Button
            content={"ADD A FRIEND"}
            type={"submit"}
            onClickFn={handleClick}
          ></Button>
        </div>
      </div>
      <div className={styles.friends}>
        <FriendsList friends={searchFriends} />
      </div>
    </>
  );
}
