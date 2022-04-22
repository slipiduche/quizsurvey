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
          <div>
            <Text strong>{`Address: `}</Text>{" "}
            <Text
              strong
              style={{ color: "#1890ff" }}
            >{`${props.store.wallet.account}`}</Text>
          </div>

          <div>
            <Text strong>{`Quiz Balance: `}</Text>
            <Text
              strong
              style={{ color: "#1890ff" }}
            >{`${props.store.wallet.quizBalance}`}</Text>
          </div>
        </Space>
      </Col>
      <Col xs={1} md={4}></Col>
      <Col xs={1} md={4}></Col>
      <Col xs={1} md={1}></Col>
      <Col xs={2}>
        <ButtonWallet store={props.store}></ButtonWallet>
      </Col>
    </Row>
  </>
));
