import React from "react";

import { Button, Space } from "antd";
import { WalletOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
const ButtonWallet = observer((props: any) => (
  <Space style={{ width: "100%" }}>
    <Button
      type="primary"
      icon={<WalletOutlined />}
      loading={false}
      onClick={() => {}}
    >
      Connect
    </Button>
  </Space>
));

export default ButtonWallet;
