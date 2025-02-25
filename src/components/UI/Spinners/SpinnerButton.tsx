import React from "react";

interface SpinnerButtonProps {
  spinnerClass: string;
}

const SpinnerButton: React.FC<SpinnerButtonProps> = ({ spinnerClass }) => {
  return (
    <button
      style={{ opacity: "0.7" }}
      className={spinnerClass}
      type="button"
      disabled
    >
      <span
        className="spinner-grow spinner-grow-sm"
        role="status"
        aria-hidden="true"
      ></span>
      Loading...
    </button>
  );
};

export default SpinnerButton;
