import Header from "../../ui/header/header";
import Button from "../../partials/buttons/priamryButton";
import InputField from "../../ui/inputFields/inputField";
import LinkText from "../../partials/textBox/linkText";
export default function Signup() {
  const params = [
    {
      field: "email",
      placeholder: "John@example.com",
      label: "Email",
      type: "text",
    },
    {
      field: "username",
      placeholder: "Sensitivetube0",
      label: "Username",
      type: "text",
    },
    {
      field: "password",
      placeholder: "......",
      label: "Password",
      type: "password",
    },
  ];
  //wrap inputField and button in a Form and make loggs user and uses  actionData and useNavigation

  return (
    <>
      <Header />
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
        <Button content={"SIGNUP"} type={"submit"} />
      </div>
      <div style={{ justifySelf: "center", marginTop: "3rem" }}>
        Already have an account <LinkText path="/login" content={"Login"} />
      </div>
    </>
  );
}
