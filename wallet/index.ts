import { ethers } from "ethers";
import { store } from "../store";

export const verifyNetwork = async () => {
  if (window.ethereum) {
    const res = await window.ethereum.request({ method: "eth_chainId" });
    if (res == "0x3") {
      store.wallet.setInvalidChain(false);
    } else {
      store.wallet.setInvalidChain(true);
    }
  } else {
    // if no window.ethereum then MetaMask is not installed
    alert(
      "MetaMask is not installed. Please consider installing it: https://metamask.io/download.html"
    );
  }
};
export const switchNetwork = async () => {
  if (window.ethereum) {
    try {
      // check if the chain to connect to is installed
      console.log("switching to robstein");
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x3" }], // chainId must be in hexadecimal numbers
      });
      store.wallet.setInvalidChain(false);
    } catch (error: any) {
      console.error(error);
    }
  } else {
    // if no window.ethereum then MetaMask is not installed
    alert(
      "MetaMask is not installed. Please consider installing it: https://metamask.io/download.html"
    );
  }
};
export const connectHandler = async () => {
  console.log("connectHandler");
  if (window.ethereum) {
    try {
      const res = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(res[0]);
      console.log(typeof res[0]);
      store.wallet.setAccount(res[0]);
      store.wallet.setConnecting(false);
      store.wallet.setConnected(true);
    } catch (err) {
      console.error(err);
      store.wallet.setErrorMessage(
        "There was a problem connecting to MetaMask"
      );
      store.wallet.setConnecting(false);
      store.wallet.setConnected(false);
    }
  } else {
    console.log("error");
    store.wallet.setConnecting(false);
    store.wallet.setConnected(false);
    store.wallet.setErrorMessage("Install MetaMask");
  }
};
export const accountsChanged = async (newAccount: string | string[]) => {
  console.log(newAccount);
  if (typeof newAccount == "string") {
    store.wallet.setAccount(newAccount);
  } else {
    store.wallet.setAccount(newAccount[0]);
  }

  await connectHandler();

  try {
    const balance = await window.ethereum.request({
      method: "eth_getBalance",
      params: [newAccount.toString(), "latest"],
    });
    store.wallet.setBalance(ethers.utils.formatEther(balance));
    store.wallet.setConnecting(false);
    store.wallet.setConnected(true);
  } catch (err) {
    store.wallet.setConnecting(false);
    store.wallet.setConnected(false);
    console.error(err);
    store.wallet.setErrorMessage("There was a problem connecting to MetaMask");
  }
};

export const chainChanged = (chain: string | string[]) => {
  if (chain == "0x3") {
    //robstein network
    store.wallet.setInvalidChain(false);
  } else {
    store.wallet.setErrorMessage("Invalid network please switch to robstein");
    store.wallet.setInvalidChain(true);
    store.wallet.setAccount("");
    store.wallet.setBalance("0");
    store.wallet.setConnecting(false);
    store.wallet.setConnected(false);
  }
};
