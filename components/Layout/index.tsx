import React, { FC } from "react";
import { Navbar } from "../UI";

import { Layout } from "antd";
import { store } from "../../store";

const { Header, Content, Footer } = Layout;
type Props = { title?: string; children: React.ReactNode };
export const MainLayout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Header
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
          backgroundColor: "transparent",
        }}
      >
        <Navbar store={store} />
      </Header>
      <Content>
        <>{children}</>
      </Content>
    </>
  );
};
