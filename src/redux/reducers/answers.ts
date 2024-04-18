import { AnswersType } from "../../models/answer.type.js";
import { ADD_ANSWER, RECEIVE_ANSWERS } from "../actions/answers";

export default function answers(
  state: AnswersType = [],
  action: {
    type: string;
    answers: AnswersType;
    authedUserId: number;
    questionId: number;
    option: number;
  }
) {
  switch (action.type) {
    case RECEIVE_ANSWERS:
      return action.answers;
    case ADD_ANSWER:
      return [
        ...state,
        {
          id: state.length + 1,
          user_id: action.authedUserId,
          question_id: action.questionId,
          option: action.option,
        },
      ];
    default:
      return state;
  }
}
