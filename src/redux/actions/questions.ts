import { Dispatch } from "redux";
import { saveNewQuestion, saveAnsweredByQuestion } from "../../api";
import { QuestionsType } from "../../models/question.type";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_ANSWERED_BY_QUESTION = "ADD_ANSWERED_BY_QUESTION";
export const ADD_NEW_QUESTION = "ADD_NEW_QUESTION";


export const receiveQuestions = ({questions}: {questions: QuestionsType}) => {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
};

export const addAnsweredByQuestion = ({authedUserId, questionId}: {authedUserId: number, questionId:number}) => {
  return {
    type: ADD_ANSWERED_BY_QUESTION,
    authedUserId,
    questionId,
  };
};

export const addNewQuestion = ({authedUserId,optionOne,optionTwo}:{authedUserId: number, optionOne:string, optionTwo: string}) => {
  return {
    type: ADD_NEW_QUESTION,
    authedUserId,
    optionOne,
    optionTwo,
  };
}

export const handleAddAnsweredByQuestion = ({authedUserId,questionId}:{authedUserId: number, questionId:number}) => {
  return async (dispatch: Dispatch) => {
    dispatch(addAnsweredByQuestion({authedUserId, questionId}));
    await saveAnsweredByQuestion({authedUserId, questionId});
  };
}

export const handleAddNewQuestion = ({authedUserId,optionOne,optionTwo}:{authedUserId:number,optionOne:string,optionTwo:string}) => {
  return async (dispatch: Dispatch) => {
    dispatch(addNewQuestion({authedUserId, optionOne, optionTwo}));
    await saveNewQuestion({authedUserId, optionOne, optionTwo});
  };
}