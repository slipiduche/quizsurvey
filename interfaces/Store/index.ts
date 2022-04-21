import { IStateTreeNode } from "mobx-state-tree/dist/internal";
import { NonEmptyObject } from "mobx-state-tree/dist/types/complex-types/model";

export interface StoreData {
  wallet: {
    account: string;
    connecting: boolean;
    connected: boolean;
    quizBalance: string;
    errorMessage: string;
    invalidChain: boolean;
  } & NonEmptyObject & {
      setConnecting: (state: boolean) => void;
      setConnected: (state: boolean) => void;
      setQuizBalance: (value: string) => void;
      setErrorMessage: (message: string) => void;
    } & IStateTreeNode;
}
