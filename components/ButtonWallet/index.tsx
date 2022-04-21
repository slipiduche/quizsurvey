import React from "react";

import { Button, Space } from "antd";
import { WalletOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { StoreData } from "../../interfaces";
import { connectHandler, switchNetwork } from "../../wallet/index";

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
        if (wallet.invalidChain) {
          switchNetwork();
        } else {
          connectHandler();
        }
      }}
    >
      {props.store.wallet.invalidChain
        ? "Switch Network"
        : props.store.wallet.connecting
        ? "Connecting"
        : props.store.wallet.connected
        ? "Connected"
        : "Connect"}
    </Button>
  </Space>
));
