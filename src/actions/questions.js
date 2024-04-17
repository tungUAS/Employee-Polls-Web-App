import { saveNewQuestion, saveAnsweredByQuestion } from "../api";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_ANSWERED_BY_QUESTION = "ADD_ANSWERED_BY_QUESTION";
export const ADD_NEW_QUESTION = "ADD_NEW_QUESTION";

export const receiveQuestions = (questions) => {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
};

export const addAnsweredByQuestion = (authedUserId, questionId) => {
  return {
    type: ADD_ANSWERED_BY_QUESTION,
    authedUserId,
    questionId,
  };
};

export const addNewQuestion = (authedUserId, optionOne, optionTwo) => {
  return {
    type: ADD_NEW_QUESTION,
    authedUserId,
    optionOne,
    optionTwo,
  };
}

export const handleAddAnsweredByQuestion = (authedUserId, questionId) => {
  return async (dispatch) => {
    dispatch(addAnsweredByQuestion(authedUserId, questionId));
    await saveAnsweredByQuestion(authedUserId, questionId);
  };
}

export const handleAddNewQuestion = (authedUserId, optionOne, optionTwo) => {
  return async (dispatch) => {
    dispatch(addNewQuestion(authedUserId, optionOne, optionTwo));
    await saveNewQuestion(authedUserId, optionOne, optionTwo);
  };
}