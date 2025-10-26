import InputField from "../../ui/inputFields/inputField";
import Header from "../../ui/header/header";
import Button from "../../partials/buttons/priamryButton";
import LinkText from "../../partials/textBox/linkText";
import { Form, useActionData, useNavigation } from "react-router";

export default function Login() {
  const actionData = useActionData();
  const navigation = useNavigation();

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

  return (
    <>
      <Header />

      <Form method="POST">
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
          <Button
            content={"LOGIN"}
            type={"submit"}
            disabled={navigation.state === "submitting"}
          />
        </div>
        <div style={{ justifySelf: "center", marginTop: "2vh" }}>
          {actionData?.errors?.map((err) => (
            <div key={err.msg}>{err.msg}</div>
          ))}
          {actionData?.message}
        </div>
      </Form>
      <div style={{ justifySelf: "center", marginTop: "3rem" }}>
        Don't have an account <LinkText path="/signup" content={"Signup"} />
      </div>
    </>
  );
}
