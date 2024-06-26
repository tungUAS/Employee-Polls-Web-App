import { SET_AUTHED_USER } from "../actions/authedUser";

export default function authedUser(
  state = null,
  action: { type: string; id: number; name: string }
) {
  switch (action.type) {
    case SET_AUTHED_USER:
      return {
        id: action.id,
        name: action.name,
      };
    default:
      return state;
  }
}
