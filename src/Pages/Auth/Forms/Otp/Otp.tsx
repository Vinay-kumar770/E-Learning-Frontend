import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthService from "../../../../ApiServices/auth.service";
import "../Form.css";
import Alert from "../alert";
import Input from "../../../../components/UI/Input/FormInput";
import MainPage from "../../../../components/UI/MainPage/MainPage";
import SpinnerButton from "../../../../components/UI/Spinners/SpinnerButton";
import SubmitButton from "../../../../components/UI/Buttons/SubmitButton";
import Layout from "../../../../components/Layout/Layout";

interface FormField {
  placeholder: string;
  value: string;
  valid: boolean;
  type: string;
  error: string;
  msg: string;
  touched: boolean;
}

interface AlertState {
  valid: boolean;
  msg: string;
  alertType: string;
}

const Otp: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<{ otp: FormField }>({
    otp: {
      placeholder: "Enter your 6-digit OTP",
      value: "",
      valid: false,
      type: "text",
      error: "",
      msg: "",
      touched: false,
    },
  });

  const [loading, setLoading] = useState(false);
  const [email] = useState(localStorage.getItem("email"));
  const [alert, setAlert] = useState<AlertState>({
    valid: !!localStorage.getItem("valid"),
    msg: localStorage.getItem("msg") || "",
    alertType: localStorage.getItem("type") || "",
  });

  const showAlert = (msg: string, type: string) => {
    setAlert({ valid: true, msg, alertType: type });
  };

  const inputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    inputIdentifier: string
  ) => {
    const inputValue = event.target.value.replace(/[^0-9]/g, "").slice(0, 6);

    const updatedForm = { ...form };
    const updatedElement = {
      ...updatedForm[inputIdentifier as keyof typeof form],
    };

    updatedElement.value = inputValue;
    updatedElement.touched = inputValue.length > 0;
    updatedElement.valid = inputValue.length === 6;

    updatedForm[inputIdentifier as keyof typeof form] = updatedElement;
    setForm(updatedForm);
  };

  const formHandler = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const formData = {
      otp: form.otp.value,
      email: email,
    };

    AuthService.otp(formData)
      .then((response) => {
        setLoading(false);
        localStorage.clear();
        localStorage.setItem("user", response.data.access_token);
        localStorage.setItem("ref_token", response.data.refresh_token);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("userName", response.data.username);
        navigate("/HomePage");
      })
      .catch((error) => {
        setLoading(false);
        showAlert(
          error.response?.data?.message || "OTP verification failed",
          "danger"
        );
      });
  };

  return (
    <Layout>
      {alert.valid && (
        <Alert value={true} alertMsg={alert.msg} alertType={alert.alertType} />
      )}
      <div className="SideContent">
        <MainPage heading1="Please Verify" heading2="your Email Address" />
        <div className="login-form-otp">
          <form onSubmit={formHandler}>
            <Input
              placeholder={form.otp.placeholder}
              value={form.otp.value}
              type={form.otp.type}
              invalid={!form.otp.valid && form.otp.touched}
              changed={(event) => inputChangeHandler(event, "otp")}
            />
            {form.otp.value.length === 6 && form.otp.valid && (
              <p className="text-success">OTP is valid!</p>
            )}
            {form.otp.value.length > 0 && form.otp.value.length < 6 && (
              <p className="text-warning">OTP must be exactly 6 digits</p>
            )}
            <p
              className="forgot-password"
              onClick={() => showAlert("OTP resent to your email!", "info")}
            >
              Resend OTP?
            </p>
            {loading ? (
              <SpinnerButton spinnerClass="Submit-btn" />
            ) : (
              <SubmitButton
                className="Submit-btn"
                Label="Confirm OTP"
                disabled={!form.otp.valid}
              />
            )}
            <p className="account-login">
              <Link to="/login">Already have an account? Login</Link>
            </p>
            <hr />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Otp;

// Let me know if you want me to add a resend cooldown timer or any other features! 🚀
