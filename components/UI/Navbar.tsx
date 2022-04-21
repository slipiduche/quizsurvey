import React from "react";
import { ButtonWallet } from "../ButtonWallet/index";
import { store } from "../../store/index";

export const Navbar = () => {
  return (
    <>
      <ButtonWallet store={store}></ButtonWallet>
    </>
  );
};
