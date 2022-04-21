import "../styles/globals.css";
import type { AppProps } from "next/app";
import "antd/dist/antd.css";
import { ethers } from "ethers";
import { useEffect } from "react";
import { accountsChanged, chainChanged } from "../wallet";
function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (window.ethereum) {
      //console.log('eth')
      window.ethereum.on("accountsChanged", accountsChanged);
      window.ethereum.on("chainChanged", chainChanged);
    }
  }, []);
  return <Component {...pageProps} />;
}

export default MyApp;
