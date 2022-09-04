import React from "react";
import { Alert } from "react-bootstrap";

const AlertBanner = ({ message, variant }) => {
  const alertMessage =
    message || "예기치 않은 오류가 발생했습니다. 나중에 다시 시도 해주십시오";
  const alertVariant = variant || "danger";

  return (
    <Alert variant={alertVariant} style={{ backgroundColor: "red" }}>
      {alertMessage}
    </Alert>
  );
};

export default AlertBanner;
