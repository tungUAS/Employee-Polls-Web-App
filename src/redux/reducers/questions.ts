import { QuestionsType } from "../../models/question.type";
import { RECEIVE_QUESTIONS } from "../actions/questions";
import { ADD_ANSWERED_BY_QUESTION } from "../actions/questions";
import { ADD_NEW_QUESTION } from "../actions/questions";

const questions = (
  state: QuestionsType = [],
  action: {
    type: string;
    questions: QuestionsType;
    questionId: number;
    authedUserId: number;
    optionOne: string;
    optionTwo: string;
  }
) => {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return [...state, ...action.questions];
    case ADD_ANSWERED_BY_QUESTION:
      return state.map((question) =>
        question.id === action.questionId
          ? {
              ...question,
              answered_by: [...question.answered_by, action.authedUserId],
            }
          : question
      );
    case ADD_NEW_QUESTION:
      return [
        ...state,
        {
          id: state.length + 1,
          created_at: new Date().toISOString(),
          created_by: action.authedUserId,
          option_one: action.optionOne,
          option_two: action.optionTwo,
          answered_by: [],
        },
      ];
    default:
      return state;
  }
};

export default questions;
