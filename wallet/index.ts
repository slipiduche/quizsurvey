import { ethers } from "ethers";
import { IMSTArray, ISimpleType } from "mobx-state-tree";
import { store } from "../store";

export const connectHandler = async () => {
  if (window.ethereum) {
    try {
      const res = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(res[0]);
      console.log(typeof res[0]);
      await accountsChanged(res[0]);
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
  if (typeof newAccount == "string") {
    store.wallet.setAccount(newAccount);
  } else {
    store.wallet.setAccount(newAccount[0]);
  }

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
