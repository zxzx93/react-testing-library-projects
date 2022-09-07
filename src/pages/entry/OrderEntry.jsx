import React from "react";
import { useOrderDetails } from "../../contexts/OrderDetails";
import Options from "./Options";

const OrderEntry = () => {
  //context 상태값 가져옴
  const [orderDetails] = useOrderDetails();

  return (
    <>
      <h1>Design Your Sundae!!</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />

      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
    </>
  );
};

export default OrderEntry;
