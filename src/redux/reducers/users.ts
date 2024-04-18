import { UsersType } from "../../models/user.type";
import { RECEIVE_USERS } from "../actions/users";

const users = (state:UsersType = [], action: {
  type: string;
  users: UsersType;
}) => {
  switch (action.type) {
    case RECEIVE_USERS:
      return [
        ...state,
        ...action.users,
      ];
    default:
      return state;
  }
};

export default users;