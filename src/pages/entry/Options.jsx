import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row } from "react-bootstrap";

import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";
import AlertBanner from "../common/AlertBanner";
import { pricePerItem } from "../../constants/index";
import { useOrderDetails } from "../../contexts/OrderDetails";

const Options = ({ optionType }) => {
  //optionType : scoops or toppings
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);

  //[context 전역 상태값, 옵션 카운트 update함수] = useOrderDetails();
  const [orderDetails, updateItemCount] = useOrderDetails();

  useEffect(() => {
    axios
      .get(
        `
      http://localhost:3030/${optionType}
    `
      )
      .then((res) => setItems(res.data))
      .catch((err) => {
        // TODO : handle error res
        setError(true);
      });
  }, [optionType]);

  if (error) {
    <AlertBanner />;
  }

  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
      updateItemCount={(itemName, newItemCount) =>
        updateItemCount(itemName, newItemCount, optionType)
      }
    />
  ));

  return (
    <>
      <h2>{title}</h2>
      <p>{pricePerItem[optionType]}</p>
      <p>
        {title} total: {orderDetails.totals[optionType]}
      </p>
      <Row>{optionItems}</Row>
    </>
  );
};

export default Options;
