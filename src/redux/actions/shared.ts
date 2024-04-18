import { getInitialData } from "../../api";
import { receiveQuestions } from "./questions";
import { receiveUsers } from "./users";
import { receiveScores } from "./scores";
import { receiveAnswers } from "./answers";
import { Dispatch } from "redux";

export function handleInitialData() {
  return async (dispatch:Dispatch) => {
    const { questions, users, scores, answers } = await getInitialData();
    dispatch(receiveQuestions({questions}));
    dispatch(receiveUsers({users}));
    dispatch(receiveScores({scores}));
    dispatch(receiveAnswers({answers}));
  };
}
