import { redirect } from "react-router";
import { sendMessage } from "../apiCalls";

export default async function sendAction({ request }) {
  try {
    const formData = await request.formData();
    const toUsername = formData.get("toUsername");
    if (!toUsername) {
      return { success: false, message: "No username" };
    }
    const message = formData.get("message");
    if (!message) {
      return { success: false, message: "Please provide a message" };
    }
    await sendMessage(toUsername, message);
    return redirect("/home");
  } catch (err) {
    console.error(`Error sending message ${err}`);
    if (err.response && err.response.data) {
      return err.response.data;
    }
    return { success: false, message: "Network error sending message" };
  }
}
