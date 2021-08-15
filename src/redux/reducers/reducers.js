import { ActionTypes } from "../constants/actionconstants";
let default_state = {
  auth: false,
  user: null,
  socket: null,
  shapes: [],
};

let reducerFunction = (state = default_state, action) => {
  switch (action.type) {
    case ActionTypes.AUTH:
      return { ...state, auth: action.payload };
    case ActionTypes.SET_SOCKET:
      return { ...state, socket: action.payload };
    case ActionTypes.AUTHENTICATED_USER:
      return { ...state, user: action.payload };
    case ActionTypes.ADD_SHAPES:
      return { ...state, shapes: action.payload };
    default:
      return state;
  }
};

export default reducerFunction;
