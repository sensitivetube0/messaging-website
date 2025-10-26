import { redirect } from "react-router";
import { addFriend } from "../apiCalls";

export default async function addFriendAction({ request }) {
  try {
    const formData = await request.formData();
    const friendsUsername = formData.get("addFriend");
    await addFriend(friendsUsername);
    return redirect("/friends");
  } catch (err) {
    console.error(`Error adding friend ${err}`);
    if (err.response && err.response.data) {
      return err.response.data;
    }

    return { message: "Network error" };
  }
}
