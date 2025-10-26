import { redirect } from "react-router";
import { authenticate, refresh, authenticateMessage } from "../apiCalls";

export default async function openMessageLoader({ params }) {
  const messageId = params.messageId;
  console.log(messageId);
  try {
    await authenticate();
    const messageToUser = await authenticateMessage(messageId);
    return messageToUser;
  } catch (error) {
    try {
      console.log(`Error getting user authentication ${error}`);
      await refresh();
      await authenticate();
      const messageToUser = await authenticateMessage(messageId);
      return messageToUser;
    } catch (err) {
      console.error(`Error authenticating${err}`);
      if (err.response && err.response.data) {
        console.error(`Error ${err.response.data?.message}`);
        try {
          await authenticate();
          return redirect("/home");
        } catch (e) {
          console.error(`Error authenticating ${e}`);
          return redirect("/");
        }
      }
    }
  }
}
