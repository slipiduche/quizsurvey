import React, { FC } from "react";
import { observer } from "mobx-react-lite";
import { StoreData } from "../../interfaces/Store/index";
import { survey } from "../../Data/survey";
import { Col, Radio, Row, Space, Typography } from "antd";
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
      props.store.survey.setStarted(true);
      console.log("starting");
    } else if (
      props.store.survey.timeLeft >= 1 &&
      props.store.survey.started &&
      !props.store.survey.waiting
    ) {
      console.log("started");
      props.store.survey.setWaiting(true);
      setTimeout(() => {
        props.store.survey.setTimeLeft(props.store.survey.timeLeft - 1);
        props.store.survey.setWaiting(false);
      }, 1000);
    } else if (!props.store.survey.waiting) {
      if (props.store.survey.currentQuestion < survey.questions.length - 1) {
        props.store.survey.addAnswer(
          props.store.survey.currentAnswer,
          props.store.survey.currentQuestion.toString()
        );
        props.store.survey.setCurrentQuestion(
          props.store.survey.currentQuestion + 1
        );
        props.store.survey.setTimeLeft(
          survey.questions[props.store.survey.currentQuestion].lifetimeSeconds
        );
      } else {
        props.store.survey.addAnswer(
          props.store.survey.currentAnswer,
          props.store.survey.currentQuestion.toString()
        );
        props.store.survey.setFinished(true);
        props.store.survey.setStarted(false);
        console.log(props.store.survey.answers.toJSON());
      }
    }
  }, [props.store.survey.timeLeft]);

  const next = () => {
    props.store.survey.addAnswer(
      props.store.survey.currentAnswer,
      props.store.survey.currentQuestion.toString()
    );
    props.store.survey.setCurrentQuestion(
      props.store.survey.currentQuestion + 1
    );
  };

  return (
    <>
      {props.store.survey.finished ? (
        <></>
      ) : (
        <Steps current={props.store.survey.currentQuestion}>
          <>
            {survey.questions.map((item, index) => (
              <Step key={index} title={"Question"}></Step>
            ))}
          </>
        </Steps>
      )}
      {props.store.survey.finished ? (
        <>
          {survey.questions.map((question, index) => (
            <div>
              <Text>Question: {survey.questions[index].text}</Text>
              <Text>
                Answer:{" "}
                {
                  survey.questions[index].options[
                    props.store.survey.answers.toJSON()[`${index}`].answer - 1
                  ].text
                }
              </Text>
            </div>
          ))}
        </>
      ) : (
        <div>
          <div className="steps-content">
            {survey.questions[props.store.survey.currentQuestion].text}
          </div>
          <div className="steps-content">
            <Radio.Group
              onChange={(e) => {
                props.store.survey.setCurrentAnswer(e.target.value);
              }}
              value={props.store.survey.currentAnswer}
            >
              <Space direction="vertical">
                {survey.questions.map((question: any, index: number) => (
                  <Radio key={index} value={index + 1}>
                    {question.options[index].text}
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
          </div>
        </div>
      )}
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
            onClick={() => {
              //message.success("Processing complete!");
              props.store.survey.setFinished(true);
              props.store.survey.setStarted(false);
              console.log(props.store.survey);
            }}
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
