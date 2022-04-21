import React from "react";

import { Button, Space } from "antd";
import { WalletOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";

export const ButtonWallet = observer((props: any) => (
  <Space style={{ width: "100%" }}>
    <Button
      type="primary"
      icon={<WalletOutlined />}
      loading={props.store.wallet.connecting}
      onClick={() => {
        const wallet = props.store.wallet;
        wallet.setConnecting(true);

        setTimeout(() => {
          wallet.setConnecting(false);
          wallet.setConnected(true);
          wallet.setQuizBalance(wallet.quizBalance + 1);
        }, 2000);
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
