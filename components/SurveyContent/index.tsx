import React, { FC } from "react";
import { observer } from "mobx-react-lite";
import { StoreData } from "../../interfaces/Store/index";
import { survey } from "../../Data/survey";
import { Col, Row, Space, Typography } from "antd";
import { Steps, Button, message } from "antd";
import { useEffect } from "react";
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

export const SurveyForm = observer((props: { store: StoreData }) => {
  useEffect(() => {
    if (!props.store.survey.started && !props.store.survey.finished) {
      props.store.survey.setTimeLeft(
        survey.questions[props.store.survey.currentQuestion].lifetimeSeconds
      );
    }
    props.store.survey.setStarted(true);
    if (props.store.survey.timeLeft >= 1 && props.store.survey.started) {
      setTimeout(() => {
        props.store.survey.setTimeLeft(props.store.survey.timeLeft - 1);
      }, 1000);
    } else {
      if (props.store.survey.currentQuestion < survey.questions.length - 1) {
        props.store.survey.setCurrentQuestion(
          props.store.survey.currentQuestion + 1
        );
        props.store.survey.setTimeLeft(
          survey.questions[props.store.survey.currentQuestion].lifetimeSeconds
        );
      } else {
        props.store.survey.setStarted(false);
      }
    }
  }, [props.store.survey.timeLeft]);

  const next = () => {
    console.log(props.store.survey.currentQuestion);
    console.log(survey.questions[props.store.survey.currentQuestion].text);
    props.store.survey.setCurrentQuestion(
      props.store.survey.currentQuestion + 1
    );
  };

  return (
    <>
      <Steps current={props.store.survey.currentQuestion}>
        <>
          {survey.questions.map((item, index) => (
            <Step key={index} title={"Question"}></Step>
          ))}
        </>
      </Steps>
      <div className="steps-content">
        {survey.questions[props.store.survey.currentQuestion].text}
      </div>
      <div className="steps-action">
        {props.store.survey.currentQuestion < survey.questions.length - 1 && (
          <Button type="primary" shape="round" onClick={() => next()}>
            Next
          </Button>
        )}
        {props.store.survey.currentQuestion === survey.questions.length - 1 && (
          <Button
            shape="round"
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Submit
          </Button>
        )}
        {props.store.survey.currentQuestion >= 0 && (
          <Text style={{ margin: "0 8px" }}>
            Time left {props.store.survey.timeLeft}
          </Text>
        )}
      </div>
    </>
  );
});
