import Header from "../../../ui/header/header";
import Footer from "../../../ui/footer/footer";
import BodyHome from "../../../ui/bodys/bodyOfHome/bodyOfHome";
export default function Home() {
  //setup loader to check if user is authorised
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Header />
      <BodyHome />
      <Footer value2={2} value3={3} value4={4} />
    </div>
  );
}
