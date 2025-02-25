import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../../../ApiServices/auth.service";
import Layout from "../../../../components/Layout/Layout";
import Input from "../../../../components/UI/Input/FormInput";
import SpinnerButton from "../../../../components/UI/Spinners/SpinnerButton";
import MainPage from "../../../../components/UI/MainPage/MainPage";
import { GoogleLogin } from "@react-oauth/google";
import SubmitButton from "../../../../components/UI/Buttons/SubmitButton";
import Alert from "../alert";

interface FormField {
  placeholder: string;
  value: string;
  valid: boolean;
  type: string;
  error: string;
  msg: string;
  touched: boolean;
  validation: {
    required: boolean;
    minLength?: number;
    maxLength?: number;
    regex?: RegExp;
  };
}

interface AlertState {
  valid: boolean;
  msg: string;
  alertType: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<Record<string, FormField>>({
    email: {
      placeholder: "Email",
      value: "",
      valid: false,
      type: "email",
      error: "",
      msg: "",
      touched: false,
      validation: {
        required: true,
        regex: /^([a-z\d.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
      },
    },
    password: {
      placeholder: "Password",
      value: "",
      valid: false,
      type: "password",
      error: "",
      msg: "",
      touched: false,
      validation: {
        required: true,
        minLength: 5,
        maxLength: 18,
      },
    },
  });

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<AlertState>({
    valid: false,
    msg: "",
    alertType: "",
  });
  const [alertPressed, setAlertPressed] = useState(false);

  const checkValidity = (
    value: string,
    rules: FormField["validation"]
  ): boolean => {
    let isValid = true;
    if (rules.required) isValid = value.trim() !== "" && isValid;
    if (rules.minLength) isValid = value.length >= rules.minLength && isValid;
    if (rules.maxLength) isValid = value.length <= rules.maxLength && isValid;
    if (rules.regex) isValid = rules.regex.test(value) && isValid;
    return isValid;
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    inputIdentifier: string
  ) => {
    const updatedField = {
      ...form[inputIdentifier],
      value: event.target.value,
    };
    updatedField.valid = checkValidity(
      updatedField.value,
      updatedField.validation
    );
    setForm({ ...form, [inputIdentifier]: updatedField });
  };

  const handleInputBlur = (inputIdentifier: string) => {
    const updatedField = { ...form[inputIdentifier], touched: true };
    if (!updatedField.valid) {
      updatedField.error =
        inputIdentifier === "email"
          ? "Invalid format"
          : "At least 5 characters and at most 18";
      updatedField.msg = "";
    } else {
      updatedField.error = "";
      updatedField.msg = "valid";
    }
    setForm({ ...form, [inputIdentifier]: updatedField });
  };

  const isFormValid = () => Object.values(form).every((field) => field.valid);

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setAlertPressed(true);

    setTimeout(() => setAlert({ valid: false, msg: "", alertType: "" }), 3000);

    if (isFormValid()) {
      setLoading(true);
      const formData = Object.fromEntries(
        Object.entries(form).map(([key, field]) => [key, field.value])
      );

      localStorage.setItem("email", form.email.value);
      AuthService.login(formData)
        .then((response) => {
          setAlert({
            valid: true,
            msg: "Successfully Logged in",
            alertType: "success",
          });
          localStorage.setItem("user", response.data.access_token);
          localStorage.setItem("ref_token", response.data.referesh_token);
          localStorage.setItem("userId", response.data.userId);
          localStorage.setItem("userName", response.data.username);
          setLoading(false);
          navigate("/HomePage");
        })
        .catch((error) => {
          setLoading(false);
          setAlert({
            valid: true,
            msg: error.response.data.message,
            alertType: "danger",
          });
        });
    } else {
      setAlert({
        valid: true,
        msg: "Make sure the validations are correct",
        alertType: "warning",
      });
    }
  };

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
        <MainPage shelp heading1="Resume your" heading2="learning with" />
        <div className="login-form">
          <GoogleLogin
            onSuccess={() => console.log("Google login success")}
            onError={() => console.log("Google login failed")}
          />
          <p className="devider-or">OR</p>
          <form onSubmit={handleFormSubmit}>
            {Object.entries(form).map(([key, field]) => (
              <Input
                key={key}
                placeholder={field.placeholder}
                value={field.value}
                type={field.type}
                invalid={!field.valid}
                touched={field.touched}
                errors={field.error}
                msg={field.msg}
                blur={() => handleInputBlur(key)}
                changed={(event) => handleInputChange(event, key)}
              />
            ))}
            <SubmitButton
              className="Submit-btn"
              Label={
                loading ? <SpinnerButton spinnerClass="Submit-btn" /> : "Login"
              }
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
