import { types } from "mobx-state-tree";

const WalletState = types
  .model({
    connecting: types.optional(types.boolean, false),
    connected: types.optional(types.boolean, false),
    quizBalance: types.optional(types.number, 0),
  })
  .actions((self) => {
    function setConnecting(state: boolean) {
      self.connecting = state;
    }
    function setConnected(state: boolean) {
      self.connected = state;
    }
    function setQuizBalance(value: number) {
      self.quizBalance = value;
    }
    return { setConnecting, setConnected, setQuizBalance };
  });

const RootStore = types.model({
  wallet: WalletState,
});
// .actions((self) => {
//   function setConnecting(state: boolean) {
//     self.wallet.setConnecting(state);
//   }
//   function setConnected(state: boolean) {
//     self.wallet.setConnected(state);
//   }
//   function setQuizBalance(value: number) {
//     self.wallet.setQuizBalance(value);
//   }

//   return { setConnecting, setConnected, setQuizBalance };
// });

export const store = RootStore.create({
  wallet: { connected: false, connecting: false, quizBalance: 0 },
});
