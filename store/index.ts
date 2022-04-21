import { IMSTArray, ISimpleType, types } from "mobx-state-tree";

const WalletState = types
  .model({
    connecting: types.optional(types.boolean, false),
    connected: types.optional(types.boolean, false),
    quizBalance: types.optional(types.string, "0"),
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
    function setQuizBalance(value: string) {
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
      setInvalidChain,
    };
  });

const Answer = types.model({
  answer: types.optional(types.number, 0),
});
const SurveyState = types
  .model({
    timeLeft: types.optional(types.number, 10),
    currentQuestion: types.optional(types.number, 0),
    currentAnswer: types.optional(types.number, 0),
    finished: types.optional(types.boolean, false),
    answers: types.map(Answer),
  })
  .actions((self) => ({
    addAnswer(answer: number, id: string) {
      self.answers.set(id, Answer.create({ answer }));
    },
    setTimeLeft(timeLeft: number) {
      self.timeLeft = timeLeft;
    },
    setCurrentQuestion(currentQuestion: number) {
      self.currentQuestion = currentQuestion;
    },
    setCurrentAnswer(currentAnswer: number) {
      self.currentAnswer = currentAnswer;
    },
    setFinished(finished: boolean) {
      self.finished = finished;
    },
  }));

const RootStore = types.model({
  wallet: WalletState,
  survey: SurveyState,
});

export const store = RootStore.create({
  wallet: {
    connected: false,
    connecting: false,
    quizBalance: "0",
    invalidChain: false,
  },
  survey: {},
});
