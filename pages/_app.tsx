import "../styles/globals.css";
import type { AppProps } from "next/app";
import "antd/dist/antd.css";
import { ethers } from "ethers";
import { useEffect } from "react";
import { accountsChanged, chainChanged, verifyNetwork } from "../wallet";
function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    //console.log("useEffect");

    verifyNetwork();

    window.ethereum.on("accountsChanged", accountsChanged);
    window.ethereum.on("chainChanged", chainChanged);
  }, []);
  return <Component {...pageProps} />;
}

export default MyApp;
