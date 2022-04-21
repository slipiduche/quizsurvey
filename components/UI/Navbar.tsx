import React from "react";
import { ButtonWallet } from "../ButtonWallet/index";
import { store } from "../../store/index";
import { Row, Col, Typography } from "antd";
import { observer } from "mobx-react-lite";
import { StoreData } from "../../interfaces";

export const Navbar = observer((props: { store: StoreData }) => (
  <>
    <Row>
      <Col span={12}>
        <Typography>{`address:${props.store.wallet.account}`}</Typography>
      </Col>

      <Col span={6}></Col>
      <Col span={6}>
        <ButtonWallet store={store}></ButtonWallet>
      </Col>
    </Row>
  </>
));
