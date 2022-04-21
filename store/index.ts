import { types, getSnapshot } from "mobx-state-tree";

export const WalletState = types
  .model({
    connecting: false,
    connected: true,
    quizBalance: 0,
  })
  .actions((self) => ({
    setConnecting(state: boolean) {
      self.connecting = state;
    },
    setConnected(state: boolean) {
      self.connecting = state;
    },
    setQuizBalance(value: number) {
      self.quizBalance = value;
    },
  }));
