import { IMSTArray, ISimpleType, types } from "mobx-state-tree";

const WalletState = types
  .model({
    connecting: types.optional(types.boolean, false),
    connected: types.optional(types.boolean, false),
    quizBalance: types.optional(types.number, 0),
    errorMessage: types.optional(types.string, ""),
    account: types.optional(types.string, ""),
    balance: types.optional(types.string, "0"),
    invalidChain: types.optional(types.boolean, false),
  })
  .actions((self) => {
    function setInvalidChain(state: boolean) {
      self.invalidChain = state;
    }
    function setConnecting(state: boolean) {
      self.connecting = state;
    }
    function setConnected(state: boolean) {
      self.connected = state;
    }
    function setQuizBalance(value: number) {
      self.quizBalance = value;
    }
    function setBalance(value: string) {
      self.balance = value;
    }
    function setErrorMessage(message: string) {
      self.errorMessage = message;
    }
    function setAccount(account: string) {
      self.account = account;
    }
    return {
      setConnecting,
      setConnected,
      setQuizBalance,
      setBalance,
      setErrorMessage,
      setAccount,
      setInvalidChain
    };
  });

const RootStore = types.model({
  wallet: WalletState,
});

export const store = RootStore.create({
  wallet: {
    connected: false,
    connecting: false,
    quizBalance: 0,
    invalidChain: false,
  },
});
