import { Col, Row, Typography } from "antd";
import type { NextPage } from "next";
import { MainLayout } from "../components";

const { Text, Title } = Typography;
const Home: NextPage = () => {
  return (
    <>
      <MainLayout>
        <div style={{ paddingTop: "100px" }}>
          <Row>
            <Col xs={24}>
              <Title level={4} style={{textAlign:'center'}}>daily survey</Title>
            </Col>
          </Row>
        </div>
      </MainLayout>
    </>
  );
};

export default Home;
