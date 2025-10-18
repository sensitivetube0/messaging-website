import Header from "../../../ui/header/header";
import BodyNotLoggedIn from "../../../ui/bodys/bodyNotLoggedIn/bodyNotLoggedIn";
export default function NotLoggedIn() {
  //setup loader see if user is authorised
  return (
    <>
      <Header />
      <BodyNotLoggedIn />
    </>
  );
}
