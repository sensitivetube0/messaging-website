import Header from "../../../ui/header/header";
import Footer from "../../../ui/footer/footer";
import BodyHome from "../../../ui/bodys/bodyOfHome/bodyOfHome";
import { useLoaderData } from "react-router";
export default function Home() {
  const loaderData = useLoaderData();
  const username = loaderData.user.username;
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Header />
      <BodyHome content={`Welcome ${username}`} />
      <Footer value2={2} value3={3} value4={4} />
    </div>
  );
}
