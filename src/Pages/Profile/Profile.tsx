import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import Input from "../../components/UI/Input/FormInput";
import SpinnerButton from "../../components/UI/Spinners/SpinnerButton";
import SubmitButton from "../../components/UI/Buttons/SubmitButton";
import authService from "../../ApiServices/auth.service";
import axios from "axios";
interface FormField {
  placeholder: string;
  value: string;
  valid: boolean;
  type: string;
  error: string;
  msg: string;
  validation: {
    required: boolean;
    minLength?: number;
    maxLength?: number;
    regex?: RegExp;
  };
  touched: boolean;
}

interface AlertState {
  valid: boolean;
  msg: string;
  alertType: string;
}

const Profile: React.FC = () => {
  const [form, setForm] = useState<Record<string, FormField>>({
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
      validation: { required: false },
      touched: false,
    },
    interests: {
      placeholder: "Your Interests",
      value: "",
      valid: false,
      type: "text",
      error: "",
      msg: "",
      validation: { required: false },
      touched: false,
    },
    goals: {
      placeholder: "Your Goals",
      value: "",
      valid: false,
      type: "text",
      error: "",
      msg: "",
      validation: { required: false },
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
  });

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<AlertState>({
    valid: false,
    msg: "",
    alertType: "",
  });
  const navigate = useNavigate();

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
    inputId: string
  ) => {
    const updatedForm = { ...form };
    const updatedElement = { ...updatedForm[inputId] };

    updatedElement.value = event.target.value;
    updatedElement.valid = checkValidity(
      updatedElement.value,
      updatedElement.validation
    );
    updatedForm[inputId] = updatedElement;

    setForm(updatedForm);
  };

  const handleInputBlur = (inputId: string) => {
    const updatedForm = { ...form };
    const updatedElement = { ...updatedForm[inputId] };
    updatedElement.touched = true;

    if (inputId === "name") {
      updatedElement.error = updatedElement.valid
        ? ""
        : "Minimum: 5 and Maximum: 15 characters";
    } else if (inputId === "email") {
      updatedElement.error = updatedElement.valid ? "" : "Invalid format";
    }

    setForm(updatedForm);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const formData: Record<string, string> = {};
    Object.keys(form).forEach((key) => {
      formData[key] = form[key].value;
    });

    try {
      const response = await authService.update(formData);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error) && error.response) {
        setAlert({
          valid: true,
          msg: error.response.data.message[0].msg,
          alertType: "danger",
        });
      } else {
        setAlert({
          valid: true,
          msg: "An unexpected error occurred",
          alertType: "danger",
        });
      }
    }
  };

  useEffect(() => {
    authService.getUserDetails().then((response) => {
      const userData = response.data.user;
      setForm((prevForm) => ({
        ...prevForm,
        name: { ...prevForm.name, value: userData.name },
        email: { ...prevForm.email, value: userData.email },
        skills: { ...prevForm.skills, value: userData.skills },
        goals: { ...prevForm.goals, value: userData.goals },
        interests: { ...prevForm.interests, value: userData.interests },
      }));
    });
  }, []);

  return (
    <Layout>
      <div className="SideContent">
        {alert.valid && (
          <div className={`alert alert-${alert.alertType}`}>{alert.msg}</div>
        )}
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            {Object.entries(form).map(([key, field]) => (
              <div key={key}>
                <h5>{field.placeholder}</h5>
                <Input
                  placeholder={field.placeholder}
                  value={field.value}
                  type={field.type}
                  invalid={!field.valid && field.touched}
                  errors={field.error}
                  msg={field.msg}
                  changed={(e) => handleInputChange(e, key)}
                  blur={() => handleInputBlur(key)}
                />
              </div>
            ))}

            {loading ? (
              <SpinnerButton spinnerClass="Submit-btn" />
            ) : (
              <SubmitButton className="Submit-btn" Label="Submit Changes" />
            )}
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;

// Let me know if you’d like me to tweak anything else! 🚀
