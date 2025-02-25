import React from "react";

interface SubmitButtonProps {
  className: string;
  Label: string | React.ReactNode;
  disabled?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = (props) => (
  <button className={props.className} type="submit" disabled={props.disabled}>
    {props.Label}
  </button>
);

export default SubmitButton;
