import React, { useState } from "react";
import Layout from "../../../../components/Layout/Layout";
import AuthService from "../../../../ApiServices/auth.service";
import "../Form.css";
import { Link, Navigate } from "react-router-dom";
import Input from "../../../../components/UI/Input/FormInput";
import SpinnerButton from "../../../../components/UI/Spinners/SpinnerButton";
import MainPage from "../../../../components/UI/MainPage/MainPage";
import SubmitButton from "../../../../components/UI/Buttons/SubmitButton";
import Alert from "../alert";

interface FormElement {
  placeholder: string;
  value: string;
  valid: boolean;
  type: string;
  error: string;
  msg: string;
  validation: {
    required: boolean;
    regex: RegExp;
  };
  touched: boolean;
}

interface FormState {
  email: FormElement;
}

interface AlertState {
  valid: boolean;
  msg: string;
  alertType: string;
}

const EmailVerify: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    email: {
      placeholder: "Email",
      value: "",
      valid: false,
      type: "email",
      error: " ",
      msg: "",
      validation: {
        required: true,
        regex: /^([a-z\d.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
      },
      touched: false,
    },
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertState>({
    valid: false,
    msg: "",
    alertType: "",
  });
  const [redirect, setRedirect] = useState<string | null>(null);
  const [alertPressed, setAlertPressed] = useState<boolean>(false);

  const checkValidity = (
    value: string,
    rules: { required: boolean; regex: RegExp }
  ) => {
    let isValid = true;
    const regex = rules.regex;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.regex) {
      isValid = regex.test(value) && isValid;
    }

    return isValid;
  };

  const inputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    inputIdentifier: keyof FormState
  ) => {
    const updatedForm = { ...form };
    const updatedElement = { ...updatedForm[inputIdentifier] };

    updatedElement.value = event.target.value;

    updatedForm[inputIdentifier] = updatedElement;
    setForm(updatedForm);

    updatedElement.valid = checkValidity(
      updatedElement.value,
      updatedElement.validation
    );
  };

  const inputBlurHandler = (inputIdentifier: keyof FormState) => {
    const updatedForm = { ...form };
    const updatedElement = { ...updatedForm[inputIdentifier] };

    if (updatedElement.value.length > 0) updatedElement.touched = true;
    else {
      updatedElement.touched = false;
      updatedElement.error = "";
    }

    if (inputIdentifier === "email" && !updatedElement.valid) {
      updatedElement.error = "Check format";
      updatedElement.msg = "";
    }
    if (inputIdentifier === "email" && updatedElement.valid) {
      updatedElement.error = "";
      updatedElement.msg = "All good!";
    }

    updatedForm[inputIdentifier] = updatedElement;
    setForm(updatedForm);
  };

  const overallValidity = () => {
    return Object.keys(form).every((key) => form[key as keyof FormState].valid);
  };

  const timeout = () => {
    setAlert({ valid: false, msg: "", alertType: "" });
    setAlertPressed(false);
  };

  const alertError = (alertmsg: string, alertType: string) => {
    setAlert({ msg: alertmsg, valid: true, alertType });
  };

  const formHandler = (event: React.FormEvent) => {
    event.preventDefault();
    setAlertPressed(true);
    setTimeout(timeout, 3000);

    if (overallValidity()) {
      setLoading(true);
      const formData: { [key: string]: string } = {};
      for (const formElement in form) {
        formData[formElement] = form[formElement as keyof FormState].value;
      }

      AuthService.VerifyEmail(formData)
        .then((response) => {
          console.log("VerifyEmail:", response);
          localStorage.setItem("email", form["email"].value);
          setLoading(false);
          setRedirect("/ForgotPasswordotp");
        })
        .catch((error) => {
          console.log(error.response);
          setLoading(false);
          alertError(error.response.data.message, "danger");
        });
    } else {
      alertError("Make sure the validations are correct", "warning");
    }
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  const formElementsArray = Object.keys(form).map((key) => ({
    id: key,
    config: form[key as keyof FormState],
  }));

  const loginSubmitButton = loading ? (
    <SpinnerButton spinnerClass={"Submit-btn"} />
  ) : (
    <SubmitButton className={"Submit-btn"} Label={"Submit"} />
  );

  return (
    <Layout>
      {alert.valid && (
        <Alert
          value={alertPressed}
          alertMsg={alert.msg}
          alertType={alert.alertType}
        />
      )}
      <div className="SideContent">
        <MainPage
          shelp={false}
          heading1={"Reset Password,"}
          heading2={"Enter your Email"}
        />
        <div className="login-form-otp ">
          <form onSubmit={formHandler}>
            {formElementsArray.map((x) => (
              <Input
                key={x.id}
                placeholder={x.config.placeholder}
                value={x.config.value}
                type={x.config.type}
                invalid={!x.config.valid}
                touched={x.config.touched}
                errors={x.config.error}
                msg={x.config.msg}
                blur={() => inputBlurHandler(x.id as keyof FormState)}
                changed={(event) =>
                  inputChangeHandler(event, x.id as keyof FormState)
                }
              />
            ))}
            <Link to="/login">
              <p className="forgot-password">Back to Login</p>
            </Link>
            {loginSubmitButton}
            <p className="account-login">
              New User? <a href="/signup">Sign up</a>
            </p>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EmailVerify;
