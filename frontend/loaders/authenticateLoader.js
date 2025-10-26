import { redirect } from "react-router";
import { authenticate, refresh } from "../apiCalls";

export default async function authenticateLoader() {
  try {
    const res1 = await authenticate();
    return res1;
  } catch (error) {
    try {
      console.log(`Error getting user authentication ${error}`);
      await refresh();
      const res2 = await authenticate();
      return res2;
    } catch (err) {
      console.error(`Error authenticating${err}`);
      if (err.response && err.response.data) {
        console.error(`Error ${err.response.data?.message}`);
      }
      return redirect("/");
    }
  }
}
