import { combineReducers } from "redux";
import authedUser from "./authedUser";
import users from "./users";
import questions from "./questions";
import scores from "./scores";
import answers from "./answers";

const reducers = combineReducers({
  users,
  authedUser,
  questions,
  scores,
  answers,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
