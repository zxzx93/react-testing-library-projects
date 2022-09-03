import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

const SummaryForm = () => {
  const [tcChecked, setTcChecked] = useState(false);

  const popover = (
    <Popover id="termsandconditions-popover">
      <Popover.Body>아이스크림은 주문 되지 않습니다.</Popover.Body>
    </Popover>
  );

  const checkboxLabel = (
    <span>
      <OverlayTrigger
        placement="right"
        overlay={popover}
        trigger={["hover", "focus"]}
      >
        <span style={{ color: "blue" }}>이용약관</span>
      </OverlayTrigger>
      에 동의 합니다.
    </span>
  );

  return (
    <Form>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={tcChecked}
          onChange={(e) => setTcChecked(e.target.checked)}
          label={checkboxLabel}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!tcChecked}>
        주문하기
      </Button>
    </Form>
  );
};

export default SummaryForm;
