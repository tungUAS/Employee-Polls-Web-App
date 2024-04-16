import { getInitialData } from "../api";
import { receiveQuestions } from "./questions";
import { receiveUsers } from "./users";
import { receiveScores } from "./scores";
import { receiveAnswers } from "./answers";

export function handleInitialData() {
  return (dispatch) => {
    return getInitialData().then(({ questions, users, scores, answers }) => {
      dispatch(receiveQuestions(questions));
      dispatch(receiveUsers(users));
      dispatch(receiveScores(scores));
      dispatch(receiveAnswers(answers));
    });
  };
}
