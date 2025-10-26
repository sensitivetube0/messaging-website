import { redirect } from "react-router";
import { signUp } from "../apiCalls";

export default async function signupAction({ request }) {
  try {
    const formInfo = await request.formData();
    const username = formInfo.get("username");
    const email = formInfo.get("email");
    const password = formInfo.get("password");
    if (!username || !email || !password) {
      return { success: false, message: "Field missing" };
    }

    const res = await signUp(email, username, password);

    if (!res.success) {
      throw new Error();
    }
    return redirect("/home");
  } catch (error) {
    console.log(`Error doing sign up action ${error}`);
    if (error.response && error.response.data) {
      return error.response.data;
    }
    return { success: false, message: "Server Error" };
  }
}
