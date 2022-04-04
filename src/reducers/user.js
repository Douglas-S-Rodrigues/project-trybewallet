import { SUBMIT } from '../actions';

const INITIAL_STATE = {
  email: '',
};

function userLogin(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SUBMIT:
    return {
      ...state,
      email: action.payload.email,
    };
  default:
    return state;
  }
}

export default userLogin;
