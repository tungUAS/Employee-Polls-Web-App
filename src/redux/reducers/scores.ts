import { ScoresType } from "../../models/score.type";
import { RECEIVE_SCORES, UPDATE_ANSWERED_SCORES, UPDATE_CREATED_SCORES } from "../actions/scores";

const scores = (state: ScoresType = [], action: {
  type: string;
  scores: ScoresType;
  authedUserId: number;

}) => {
  switch (action.type) {
    case RECEIVE_SCORES:
      return [...state, ...action.scores];
    case UPDATE_ANSWERED_SCORES:
      return state.map(score =>
        score.user_id === action.authedUserId
          ? { ...score, answered: score.answered + 1 }
          : score
      );
    case UPDATE_CREATED_SCORES:
      return state.map(score =>
        score.user_id === action.authedUserId
          ? { ...score, created: score.created + 1 }
          : score
      );
    default:
      return state;
  }
};

export default scores;
