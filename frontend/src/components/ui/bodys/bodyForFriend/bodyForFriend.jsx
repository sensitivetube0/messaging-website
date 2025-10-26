import { useState } from "react";
import ControlledInput from "../../inputFields/controllledInput";
import FriendsList from "../../../partials/lists/friendsList";
import Button from "../../../partials/buttons/priamryButton";
import styles from "./bodyForFriend.module.css";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getFriends } from "../../../../../apiCalls.js";

export default function BodyForAddFriend({ username }) {
  const navigate = useNavigate();
  function handleClick() {
    return navigate("/addfriend");
  }
  const [search, setSearch] = useState("");

  const queryData = useQuery({
    queryKey: ["friends"],
    queryFn: async () => {
      const friends = await getFriends();
      return friends;
    },
    staleTime: 5 * 60 * 1000,
  });
  if (queryData.isLoading) return <div className="">Loading..</div>;
  if (queryData.status === "error" || queryData.isError)
    return <div className="">ERROR PAGE</div>;

  const friends = queryData.data.friends;

  const searchFriends = friends.filter(
    (f) =>
      f.toLowerCase().startsWith(search.toLowerCase()) ||
      f.toLowerCase() === search.toLowerCase()
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
