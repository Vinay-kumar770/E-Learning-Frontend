import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Layout from "../../../../components/Layout/Layout";
import AuthService from "../../../../ApiServices/auth.service";
import "../Form.css";
import Alert from "../alert";
import Input from "../../../../components/UI/Input/FormInput";
import MainPage from "../../../../components/UI/MainPage/MainPage";
import SpinnerButton from "../../../../components/UI/Spinners/SpinnerButton";
import SubmitButton from "../../../../components/UI/Buttons/SubmitButton";

// Define the type for each form field
interface FormField {
  placeholder: string;
  value: string;
  valid: boolean;
  type: string;
  error: string;
  msg: string;
  touched: boolean;
}

// Define the state shape for the form
interface FormState {
  otp: FormField;
}

interface AlertState {
  valid: boolean;
  msg: string | null;
  alertType: string | null;
}

const ForgotPasswordotp: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    otp: {
      placeholder: "Enter your OTP",
      value: "",
      valid: false,
      type: "number",
      error: " ",
      msg: "",
      touched: false,
    },
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [email] = useState<string | null>(localStorage.getItem("email"));
  const [redirect, setRedirect] = useState<string | null>(null);
  const [alert, setAlert] = useState<AlertState>({
    valid: !!localStorage.getItem("valid"),
    msg: localStorage.getItem("msg"),
    alertType: localStorage.getItem("type"),
  });

  const alertError = (alertmsg: string, alertType: string) => {
    setAlert({
      valid: true,
      msg: alertmsg,
      alertType: alertType,
    });
  };

  const inputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    inputIdentifier: string
  ) => {
    const updatedForm = { ...form };
    const updatedElement = {
      ...updatedForm[inputIdentifier as keyof FormState],
    };

    updatedElement.value = event.target.value;

    if (updatedElement.value.length > 0) updatedElement.touched = true;
    else {
      updatedElement.touched = false;
      updatedElement.error = "";
    }

    updatedForm[inputIdentifier as keyof FormState] = updatedElement;
    setForm(updatedForm);
  };

  const formHandler = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const formData: { [key: string]: string } = {};
    Object.keys(form).forEach((key) => {
      const formElement = key as keyof FormState;
      formData[formElement] = form[formElement].value;
    });

    formData.email = email!;

    AuthService.VerifyOtp(formData)
      .then((response) => {
        console.log("otpverify:Response:", response);
        setLoading(false);
        setRedirect("/ResetPassword");
      })
      .catch((error) => {
        console.log(error.response);
        setLoading(false);
        alertError(error.response.data.message, "danger");
      });
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  const formElementsArray = Object.keys(form).map((key) => ({
    id: key,
    config: form[key as keyof FormState],
  }));

  const signinSubmitButton = loading ? (
    <SpinnerButton spinnerClass={"Submit-btn"} />
  ) : (
    <SubmitButton className={"Submit-btn"} Label={"Confirm OTP"} />
  );

  return (
    <Layout>
      {alert.valid && (
        <Alert
          value={true}
          alertMsg={alert.msg!}
          alertType={alert.alertType!}
        />
      )}

      <div className="SideContent">
        <MainPage heading1={"Please Verify"} heading2={"your Email Address"} />
        <div className="login-form-otp">
          <form onSubmit={formHandler}>
            {formElementsArray.map((x) => (
              <Input
                key={x.id}
                placeholder={x.config.placeholder}
                value={x.config.value}
                type={x.config.type}
                invalid={!x.config.valid}
                changed={(event) => inputChangeHandler(event, x.id)}
              />
            ))}
            {signinSubmitButton}
            <p className="account-login">
              Already have an account? <a href="/">Login</a>
            </p>
            <hr />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPasswordotp;
