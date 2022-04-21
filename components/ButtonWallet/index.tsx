import React from "react";

import { Button, Space } from "antd";
import { WalletOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { StoreData } from "../../interfaces";
import { ethers } from "ethers";
import { connectHandler } from "../../wallet/index";

export const ButtonWallet = observer((props: { store: StoreData }) => (
  <Space style={{}}>
    <Button
      style={{ float: "right" }}
      type="primary"
      shape="round"
      icon={<WalletOutlined />}
      loading={props.store.wallet.connecting}
      onClick={() => {
        const wallet = props.store.wallet;
        connectHandler();

        // setTimeout(() => {
        //   wallet.setConnecting(false);
        //   wallet.setConnected(true);
        //   wallet.setQuizBalance(wallet.quizBalance + 1);
        // }, 2000);
      }}
    >
      {props.store.wallet.connecting
        ? "Connecting"
        : props.store.wallet.connected
        ? "Connected"
        : "Connect"}
    </Button>
  </Space>
));
