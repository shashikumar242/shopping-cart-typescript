import React from "react";
import { Row, Col } from "react-bootstrap";
import StoreItems from "../data/items.json";
import StoreItem from "../components/StoreItem";

const Store = () => {
  return (
    <>
      <Row md={2} xs={1} lg={3} className="g-3">
        {StoreItems.map((item) => (
          <Col key={item.id}>
            {/* <StoreItem item = {item}  /> */}

            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Store;
