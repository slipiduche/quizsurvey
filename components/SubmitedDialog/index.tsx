import React, { useState } from "react";
import { Modal, Button } from "antd";
import { observer } from "mobx-react-lite";
import { StoreData } from "../../interfaces";
import { SyncOutlined } from "@ant-design/icons";
import { getQuizBalance } from "../../wallet/index";

export const SubmitedDialog = observer((props: { store: StoreData }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    props.store.survey.setSubmited(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    props.store.survey.setSubmited(false);
  };

  return (
    <>
      <Modal
        title="Sing with metamask"
        visible={props.store.survey.submited}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => {
              getQuizBalance();
            }}
            icon={<SyncOutlined />}
          >Refresh Balance</Button>,
        ]}
      >
        <p>Your need confirm the transaction with your metamask wallet...</p>
        <p>
          The quiz tokens will appear in your wallet in a few minutes after
          confirming{" "}
        </p>
        <p>
          <b>Quiz Balance: </b> {props.store.wallet.quizBalance}
        </p>
      </Modal>
    </>
  );
});
