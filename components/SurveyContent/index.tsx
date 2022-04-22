import React, { FC } from "react";
import { observer } from "mobx-react-lite";
import { StoreData } from "../../interfaces/Store/index";
import { survey } from "../../Data/survey";
import { Col, Radio, Row, Space, Typography } from "antd";
import { Steps, Button, message } from "antd";
import { useEffect } from "react";
import { submitAnswers } from "../../wallet";
import { SubmitedDialog } from "../SubmitedDialog/index";
import { store } from "../../store/index";
const { Text, Title } = Typography;
const { Step } = Steps;

export const SurveyContent = observer((props: { store: StoreData }) => {
  return (
    <Row>
      <Col xs={24}>
        <Title level={4} style={{ textAlign: "center" }}>
          {survey.title}
        </Title>
        <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
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
        props.store.survey.setWaiting(false);
        props.store.survey.setTimeLeft(props.store.survey.timeLeft - 1);
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
    <div style={{ margin: "0 auto", width: "100%", textAlign: "center" }}>
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
        <div style={{ margin: "0 auto", width: "100%", paddingTop: "10px" }}>
          {survey.questions.map((question, index) => (
            <div
              key={(index + 5) * index + 5}
              style={{
                margin: "0 auto",

                width: "100%",
                textAlign: "center",
                paddingTop: "10px",
              }}
            >
              <Text key={index} strong style={{ paddingLeft: "3%" }}>
                Question {index + 1}:{"  "}
              </Text>
              <Text key={(index + 2) * index + 1}>
                {survey.questions[index].text}
              </Text>
              <Text
                key={(index + 3) * index + 2}
                strong
                style={{ paddingLeft: "3%" }}
              >
                Answer {index + 1}:{" "}
              </Text>
              <Text key={(index + 4) * index + 3}>
                {
                  survey.questions[index].options[
                    props.store.survey.answers.toJSON()[`${index}`].answer - 1
                  ].text
                }
              </Text>
            </div>
          ))}
          <div style={{ marginTop: "20px" }}>
            <Text strong style={{ paddingLeft: "3%" }}>
              Thanks you for take your time please submit the answers and claim
              your quiz tokens
            </Text>
          </div>
        </div>
      ) : (
        <div>
          <div className="steps-content" style={{ padding: "20px" }}>
            {survey.questions[props.store.survey.currentQuestion].text}
          </div>
          <div className="steps-content" style={{ padding: "10px" }}>
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
      <div className="steps-action" style={{ paddingTop: "30px" }}>
        {props.store.survey.currentQuestion < survey.questions.length - 1 && (
          <Button type="primary" shape="round" onClick={() => next()}>
            Next
          </Button>
        )}
        {props.store.survey.currentQuestion === survey.questions.length - 1 && (
          <div>
            <Button
              shape="round"
              type="primary"
              onClick={() => {
                //message.success("Processing complete!");
                if (!props.store.survey.finished) {
                  props.store.survey.addAnswer(
                    props.store.survey.currentAnswer,
                    props.store.survey.currentQuestion.toString()
                  );
                }
                props.store.survey.setFinished(true);
                props.store.survey.setStarted(false);
                console.log(props.store.survey);
                props.store.survey.setSubmited(true);
                submitAnswers(props.store.survey.answers.toJSON());
              }}
            >
              Submit
            </Button>
            <SubmitedDialog store={props.store}></SubmitedDialog>
          </div>
        )}
        {props.store.survey.currentQuestion >= 0 && (
          <Text style={{ margin: "0 8px" }}>
            Time left {props.store.survey.timeLeft}
          </Text>
        )}
      </div>
    </div>
  );
});
