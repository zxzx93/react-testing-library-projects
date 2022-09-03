import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row } from "react-bootstrap";

import ScoopOption from "./ScoopOption";

const Options = ({ optionType }) => {
  //optionType : scoops or toppings
  const [items, setItems] = useState([]);

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
      });
  }, [optionType]);

  const ItemComponent = optionType === "scoops" ? ScoopOption : null;

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return <Row>{optionItems}</Row>;
};

export default Options;
