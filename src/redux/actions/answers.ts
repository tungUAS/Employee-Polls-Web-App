import { Dispatch } from "redux";
import { saveNewAnswer } from "../../api";
import { AnswersType } from "../../models/answer.type";

export const RECEIVE_ANSWERS = "RECEIVE_ANSWERS";
export const ADD_ANSWER = "ADD_ANSWER";

export const receiveAnswers = ({ answers }: { answers: AnswersType }) => {
  return {
    type: RECEIVE_ANSWERS,
    answers,
  };
};

export const saveAnswer = ({
  option,
  authedUserId,
  questionId,
}: {
  option: number;
  authedUserId: number;
  questionId: number;
}) => {
  return {
    type: ADD_ANSWER,
    option,
    authedUserId,
    questionId,
  };
};

export const handlesaveAnswer = ({
  option,
  authedUserId,
  questionId,
}: {
  option: number;
  authedUserId: number;
  questionId: number;
}) => {
  return async (dispatch: Dispatch) => {
    dispatch(saveAnswer({ option, authedUserId, questionId }));
    await saveNewAnswer({ option, authedUserId, questionId });
  };
};
