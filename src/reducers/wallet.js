// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CURRENCIE, EXPENSE_VALUE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case CURRENCIE:
    return {
      ...state,
      currencies: action.payload,
    };
  case EXPENSE_VALUE:
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
    };
  default:
    return state;
  }
}

export default wallet;
