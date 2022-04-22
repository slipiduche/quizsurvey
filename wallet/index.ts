import { BigNumber, ethers } from "ethers";
import { store } from "../store";
import { jsonAbi } from "./jsonAbi";
import { survey } from "../Data/survey";

export const verifyNetwork = async () => {
  const web3 = window.ethereum;
  if (web3) {
    const res = await web3.request({ method: "eth_chainId" });
    if (res == "0x3") {
      store.wallet.setInvalidChain(false);
    } else {
      store.wallet.setInvalidChain(true);
    }
  } else {
    // if no web3 then MetaMask is not installed
    alert(
      "MetaMask is not installed. Please consider installing it: https://metamask.io/download.html"
    );
  }
};
export const switchNetwork = async () => {
  const web3 = window.ethereum;
  if (web3) {
    try {
      // check if the chain to connect to is installed
      console.log("switching to robsten");
      await web3.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x3" }], // chainId must be in hexadecimal numbers
      });
      store.wallet.setInvalidChain(false);
    } catch (error: any) {
      console.error(error);
    }
  } else {
    // if no web3 then MetaMask is not installed
    alert(
      "MetaMask is not installed. Please consider installing it: https://metamask.io/download.html"
    );
  }
};
export const connectHandler = async () => {
  const web3 = window.ethereum;
  console.log("connectHandler");
  if (web3) {
    try {
      const res = await web3.request({
        method: "eth_requestAccounts",
      });

      store.wallet.setAccount(res[0]);
      store.wallet.setConnecting(false);
      store.wallet.setConnected(true);
      getQuizBalance();
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
  const web3 = window.ethereum;

  if (typeof newAccount == "string") {
    store.wallet.setAccount(newAccount);
  } else {
    store.wallet.setAccount(newAccount[0]);
  }

  await connectHandler();

  try {
    const balance = await web3.request({
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
  const web3 = window.ethereum;
  if (chain == "0x3") {
    //robsten network
    store.wallet.setInvalidChain(false);
  } else {
    store.wallet.setErrorMessage("Invalid network please switch to robsten");
    store.wallet.setInvalidChain(true);
    store.wallet.setAccount("");
    store.wallet.setBalance("0");
    store.wallet.setConnecting(false);
    store.wallet.setConnected(false);
  }
};

export const getQuizBalance = async () => {
  const web3 = window.ethereum;
  // JSON ABI of the token contract
  const provider = new ethers.providers.Web3Provider(web3);
  const contractAddress = "0x74F0B668Ea3053052DEAa5Eedd1815f579f0Ee03"; // address of the token contract
  const tokenAddress = store.wallet.account; // address of which you want to get the token balance

  const token = new ethers.Contract(contractAddress, jsonAbi, provider);
  const balance = await token.balanceOf(tokenAddress);
  // const balance: BigNumber = await token.balanceOf(
  //   "0x7b45452a0ba54ea3e891e4a6a2fe9adb575e8b69"
  // );

  const stringBalance = (
    parseFloat(balance.toString()) / 1000000000000000000
  ).toString();
  store.wallet.setQuizBalance(stringBalance);
};
export const submitAnswers = async (answers: any) => {
  //console.log(answers);
  let answersList = [];
  for (const answer in answers) {
    answersList.push(answers[answer]["answer"]);
  }
  //console.log(answersList);
  const web3 = window.ethereum;
  // JSON ABI of the token contract
  const provider = new ethers.providers.Web3Provider(web3);
  const contractAddress = "0x74F0B668Ea3053052DEAa5Eedd1815f579f0Ee03"; // address of the token contract
  const tokenAddress = store.wallet.account; // address of which you want to get the token balance

  const quiz = new ethers.Contract(
    contractAddress,
    jsonAbi,
    provider.getSigner()
  );
  const result = await quiz.submit(58, answersList);
  console.log(result);
};
