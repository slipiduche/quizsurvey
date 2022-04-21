import React from "react";
import { ButtonWallet } from "../ButtonWallet/index";
import { store } from "../../store/index";
import { Row, Col } from "antd";

export const Navbar = () => {
  return (
    <>
      <Row>
        <Col span={6}></Col>
        <Col span={6}></Col>
        <Col span={6}></Col>
        <Col span={6}>
          <ButtonWallet store={store}></ButtonWallet>
        </Col>
      </Row>
    </>
  );
};
