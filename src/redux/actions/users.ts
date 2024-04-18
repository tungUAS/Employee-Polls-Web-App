import { UsersType } from "../../models/user.type";

export const RECEIVE_USERS = "RECEIVE_USERS";

export const receiveUsers = ({users}:{users: UsersType}) => {
  return {
    type: RECEIVE_USERS,
    users,
  };
};