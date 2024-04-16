import { RECEIVE_ANSWERS } from "../actions/answers";
import { ADD_ANSWER } from "../actions/answers";

export default function answers(state = [], action) {
  switch (action.type) {
    case RECEIVE_ANSWERS:
      return action.answers;
    case ADD_ANSWER:
      console.log("ADD_ANSWER", state, action);
        return [
            ...state,
            {
                id: state.length + 1,
                user_id: action.authedUser,
                question_id: action.questionId,
                option: action.option,
            },
        ]
    default:
      return state;
  }
}
