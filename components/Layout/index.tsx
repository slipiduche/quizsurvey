import React, { FC } from "react";
import { Navbar } from "../UI";

import { Layout } from "antd";
import { store } from "../../store";

const { Header, Content, Footer } = Layout;
type Props = { title?: string; children: React.ReactNode };
export const MainLayout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <div
        style={{
          padding: "10px 20px 10px 20px",
          position: "fixed",
          zIndex: 1,
          width: "100%",
          background: "#FFFFFF",
          boxShadow: " 0px 10px 25px rgba(182, 182, 182, 0.25)",
        }}
      >
        <Navbar store={store} />
      </div>
      <div
        style={{
          padding: "10px 20px 10px 20px",
          //position: "fixed",
          zIndex: 1,
          width: "100%",
          background: "#FFFFFF",
          boxShadow: " 0px 10px 25px rgba(182, 182, 182, 0.25)",
        }}
      >
        <Navbar store={store} />
      </div>
      <Content>
        <>{children}</>
      </Content>
    </>
  );
};
