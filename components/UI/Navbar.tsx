import React from "react";
import { ButtonWallet } from "../ButtonWallet/index";
import { Row, Col, Typography, Space } from "antd";
import { observer } from "mobx-react-lite";
import { StoreData } from "../../interfaces";
const { Text } = Typography;
export const Navbar = observer((props: { store: StoreData }) => (
  <>
    <Row gutter={[0, 0]}>
      <Col xs={24} sm={12}>
        <Space direction="vertical">
          <Text>{`address: ${props.store.wallet.account}`}</Text>

          <Text
            style={{ margin: 0, padding: 0 }}
          >{`Quiz Balance: ${props.store.wallet.quizBalance}`}</Text>
        </Space>
      </Col>
      <Col xs={1} md={4}></Col>
      <Col xs={1} md={4}></Col>
      <Col xs={4}>
        <ButtonWallet store={props.store}></ButtonWallet>
      </Col>
    </Row>
  </>
));
