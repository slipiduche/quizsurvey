import React, { FC } from "react";
import { Navbar } from "../UI";

import { Layout } from "antd";

const { Header, Content, Footer } = Layout;
type Props = { title?: string; children: React.ReactNode };
export const MainLayout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" , backgroundColor:'transparent'}}>
        <Navbar />
      </Header>
      <Content>
        <>{children}</>
      </Content>
    </>
  );
};
