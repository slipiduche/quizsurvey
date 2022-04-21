import { Button, Col, Image, Row, Space, Typography } from "antd";
import { observer } from "mobx-react-lite";

import React from "react";
import { survey } from "../../Data/survey";
import { StoreData } from "../../interfaces";
const { Text, Title } = Typography;
export const HomeContent = observer((props: { store: StoreData }) => {
  return (
    <div style={{ paddingTop: "110px" }}>
      {" "}
      <Row>
        <Col xs={24}>
          <Title level={4} style={{ textAlign: "center" }}>
            {survey.title}
          </Title>
        </Col>
        <Col xs={24} md={12}>
          <Space style={{ width: "100%", backgroundColor: "white" }}>
            <Image
              preview={false}
              src={survey.image}
              style={{
                display: "block",
                maxHeight: "100%",
                maxWidth: "100%",
                margin: "auto",
              }}
            ></Image>
          </Space>
        </Col>
        <Col xs={24} md={12}>
          <Space
            direction="vertical"
            style={{ width: "100%", backgroundColor: "white" }}
          >
            <Text style={{ textAlign: "start", fontSize: "22px" }}>
              Answer the survey submit the results and get tokens in the
              process...
            </Text>
            <Button
              style={{
                float: "left",
                fontSize: "22px",
                height: "60px",
              }}
              type="primary"
              shape="round"
              disabled={!props.store.wallet.connected}
              onClick={() => {}}
            >
              Take the survey
            </Button>
            {props.store.wallet.connected ? (
              <></>
            ) : (
              <Text style={{ textAlign: "start", fontSize: "22px" }}>
                Connect your wallet to take the survey
              </Text>
            )}
          </Space>
        </Col>
      </Row>
    </div>
  );
});
