import InputField from "../../ui/inputFields/inputField";
import Header from "../../ui/header/header";
import Button from "../../partials/buttons/priamryButton";
import LinkText from "../../partials/textBox/linkText";
import { useNavigate } from "react-router";
export default function Login() {
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    return navigate("/home");
  }
  const params = [
    {
      field: "email",
      label: "Email",
      type: "text",
    },
    {
      field: "username",
      label: "Username",
      type: "text",
    },
    {
      field: "password",
      label: "Password",
      type: "password",
    },
  ];
  //wrap inputField and button in a Form and make loggs user and uses actionData and useNavigation  change form to a Form and use action
  return (
    <>
      <Header />

      <form onSubmit={(e) => handleSubmit(e)}>
        {params.map((param, index) => (
          <InputField
            key={index}
            field={param.field}
            placeholder={param.placeholder}
            label={param.label}
            type={param.type}
          />
        ))}
        <div style={{ justifySelf: "center", marginTop: "5rem" }}>
          <Button content={"LOGIN"} type={"submit"} />
        </div>
      </form>
      <div style={{ justifySelf: "center", marginTop: "3rem" }}>
        Don't have an account <LinkText path="/signup" content={"Signup"} />
      </div>
    </>
  );
}
