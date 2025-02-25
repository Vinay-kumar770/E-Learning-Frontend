import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../../../components/Layout/Layout";
import AuthService from "../../../../ApiServices/auth.service";
import "../Form.css";
import Input from "../../../../components/UI/Input/FormInput";
import MainPage from "../../../../components/UI/MainPage/MainPage";
import SpinnerButton from "../../../../components/UI/Spinners/SpinnerButton";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import SubmitButton from "../../../../components/UI/Buttons/SubmitButton";
import Alert from "../alert";

// Define Field Configuration Type
interface FieldConfig {
  placeholder: string;
  value: string;
  valid: boolean;
  type: string;
  error: string;
  msg: string;
  validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    regex?: RegExp;
    match?: boolean;
  };
  touched: boolean;
}

// Define Form State Type
type FormState = Record<string, FieldConfig>;

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<FormState>({
    name: {
      placeholder: "First Name",
      value: "",
      valid: false,
      type: "text",
      error: "",
      msg: "",
      validation: { required: true, minLength: 5, maxLength: 15 },
      touched: false,
    },
    skills: {
      placeholder: "Your Skills",
      value: "",
      valid: false,
      type: "text",
      error: "",
      msg: "",
      validation: { required: true },
      touched: false,
    },
    interests: {
      placeholder: "Your Interests",
      value: "",
      valid: false,
      type: "text",
      error: "",
      msg: "",
      validation: { required: true },
      touched: false,
    },
    goals: {
      placeholder: "Your Goals",
      value: "",
      valid: false,
      type: "text",
      error: "",
      msg: "",
      validation: { required: true },
      touched: false,
    },
    email: {
      placeholder: "Email",
      value: "",
      valid: false,
      type: "email",
      error: "",
      msg: "",
      validation: {
        required: true,
        regex: /^([a-z\d.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
      },
      touched: false,
    },
    password: {
      placeholder: "Password",
      value: "",
      valid: false,
      type: "password",
      error: "",
      msg: "",
      validation: { required: true, minLength: 5, maxLength: 18 },
      touched: false,
    },
    confirmPassword: {
      placeholder: "Confirm Password",
      value: "",
      valid: false,
      type: "password",
      error: "",
      msg: "",
      validation: { required: true, match: true },
      touched: false,
    },
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<{
    valid: boolean;
    msg: string;
    alertType: string;
  }>({
    valid: false,
    msg: "",
    alertType: "",
  });

  // Validation Function
  const checkValidity = (
    value: string,
    rules?: FieldConfig["validation"]
  ): boolean => {
    if (!rules) return true;
    let isValid = true;
    if (rules.required) isValid = value.trim() !== "" && isValid;
    if (rules.minLength) isValid = value.length >= rules.minLength && isValid;
    if (rules.maxLength) isValid = value.length <= rules.maxLength && isValid;
    if (rules.regex) isValid = rules.regex.test(value) && isValid;
    if (rules.match) isValid = value === form.password.value && isValid;
    return isValid;
  };

  // Handle Input Change
  const inputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        value: event.target.value,
        valid: checkValidity(event.target.value, prev[field].validation),
        touched: true,
      },
    }));
  };

  // Form Submission
  const formHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (Object.values(form).some((field) => !field.valid)) {
      setAlert({
        valid: true,
        msg: "Make sure the validations are correct",
        alertType: "warning",
      });
      return;
    }

    setLoading(true);
    try {
      const formData = Object.fromEntries(
        Object.entries(form).map(([key, val]) => [key, val.value])
      );
      console.log(formData);
      const response = await AuthService.register(formData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", formData.email);
      localStorage.setItem("msg", response.data.message);
      navigate("/signup/otp");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setLoading(false);
      setAlert({
        valid: true,
        msg: error.response?.data?.message[0]?.msg || "Something went wrong",
        alertType: "danger",
      });
    }
  };

  // Handle Google Login
  const responseGoogle = async (response: CredentialResponse) => {
    try {
      await AuthService.Google_Signup({ tokenId: response.credential });
      navigate("/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setAlert({
        valid: true,
        msg: error.response?.data?.message || "Google signup failed",
        alertType: "danger",
      });
    }
  };

  return (
    <Layout>
      {alert.valid && (
        <Alert alertMsg={alert.msg} alertType={alert.alertType} />
      )}
      <div className="SideContent">
        <MainPage shelp={true} heading1="Start your" heading2="learning with" />
        <div className="login-form">
          <GoogleLogin
            onSuccess={responseGoogle}
            onError={() =>
              setAlert({
                valid: true,
                msg: "Google login failed",
                alertType: "danger",
              })
            }
          />
          <p className="devider-or">OR</p>
          <form onSubmit={formHandler}>
            {Object.entries(form).map(([key, config]) => (
              <Input
                key={key}
                placeholder={config.placeholder}
                value={config.value}
                type={config.type}
                invalid={!config.valid}
                touched={config.touched}
                errors={config.error}
                msg={config.msg}
                changed={(e) => inputChangeHandler(e, key)}
              />
            ))}
            {loading ? (
              <SpinnerButton spinnerClass="Submit-btn" />
            ) : (
              <SubmitButton className="Submit-btn" Label="Create Account" />
            )}
            <p className="account-login">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
