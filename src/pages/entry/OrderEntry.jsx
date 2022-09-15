import React from "react";
import { useOrderDetails } from "../../contexts/OrderDetails";
import Options from "./Options";
import  Button  from "react-bootstrap/Button";

const OrderEntry = ({ setOrderPhase }) => {
  //context 상태값 가져옴
  const [orderDetails] = useOrderDetails();

  return (
    <>
      <h1>Design Your Sundae!!</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />

      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>

      <Button onClick={() => setOrderPhase("review")}>Order Sundae!</Button>
    </>
  );
};

export default OrderEntry;
