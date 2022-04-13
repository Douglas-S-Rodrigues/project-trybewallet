import { CURRENCIE, EXPENSE_VALUE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case CURRENCIE:
    return {
      ...state,
      currencies: action.state,
    };
  case EXPENSE_VALUE:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  default:
    return state;
  }
}

export default wallet;
