import React, { FC } from "react";
import { observer } from "mobx-react-lite";
import { StoreData } from "../../interfaces/Store/index";
import { survey } from "../../Data/survey";
import { Col, Row, Typography } from "antd";
import { Steps, Button, message } from "antd";
const { Text, Title } = Typography;
const { Step } = Steps;

export const SurveyContent = observer((props: { store: StoreData }) => {
  return (
    <Row>
      <Col xs={24}>
        <Title level={4} style={{ textAlign: "center" }}>
          {survey.title}
        </Title>
        <div style={{ padding: "20px" }}>
          <SurveyForm store={props.store}></SurveyForm>
        </div>
      </Col>
    </Row>
  );
});

export const SurveyForm: FC<{ store: StoreData }> = ({ store }) => {
  const [current, setCurrent] = React.useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  return (
    <>
      <Steps current={current}>
        <>
          {" "}
          {survey.questions.map((item, index) => (
            <>
              <Step key={index} title={"Question"}></Step>
            </>
          ))}
        </>
      </Steps>
      <div className="steps-content">{survey.questions[current].text}</div>
      <div className="steps-action">
        {current < survey.questions.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === survey.questions.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}
        {current >= 0 && (
          <Text style={{ margin: "0 8px" }}>
            Time left {survey.questions[current].lifetimeSeconds}
          </Text>
        )}
      </div>
    </>
  );
};
