import React, { FC } from "react";
import { Navbar } from "../UI";
type Props = { title?: string; children: React.ReactNode };
export const Layout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Navbar />
      <>{children}</>
    </>
  );
};
