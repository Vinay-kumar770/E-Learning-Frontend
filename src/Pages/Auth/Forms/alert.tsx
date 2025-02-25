import React from "react";
import "./alert.css";

interface AlertProps {
  alertType: string;
  value?: boolean;
  alertMsg: string;
}

const Alert: React.FC<AlertProps> = ({ alertType, value, alertMsg }) => {
  const alertColors = [
    "alertbox",
    "alert",
    "alert-dismissible",
    "fade",
    "show",
  ];

  if (alertType === "warning") alertColors.push("alert-warning");
  if (alertType === "danger") alertColors.push("alert-danger");
  if (alertType === "success") alertColors.push("alert-success");
  if (!value) alertColors.push("unvisible");

  return (
    <div
      style={{ position: "fixed" }}
      className={alertColors.join(" ")}
      role="alert"
    >
      {alertMsg}
    </div>
  );
};

export default Alert;
