import React from "react";
import "./Input.css";

interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  invalid: boolean;
  touched?: boolean;
  msg?: string;
  errors?: string;
  blur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  changed: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  value,
  invalid,
  touched,
  msg,
  errors,
  blur,
  changed,
}) => {
  const inputClasses = ["InputElement"];

  if (invalid && touched) {
    inputClasses.push("Invalid");
  } else if (touched) {
    inputClasses.push("Valid");
  }

  let errorMessage = <p style={{ opacity: "0" }}>a</p>;

  if (msg && touched) {
    errorMessage = <p className="text-success error-msg">{msg}</p>;
  } else if (errors && touched) {
    errorMessage = (
      <p style={{ color: "red" }} className="error-msg">
        {errors}
      </p>
    );
  }

  return (
    <div className="Input">
      <input
        type={type}
        placeholder={placeholder}
        className={inputClasses.join(" ")}
        value={value}
        onBlur={blur}
        onChange={changed}
      />
      {errorMessage}
    </div>
  );
};

export default Input;
