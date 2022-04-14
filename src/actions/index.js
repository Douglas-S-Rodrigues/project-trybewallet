export const SUBMIT = 'SUBMIT';
export const CURRENCIE = 'CURRENCIE';
export const EXPENSE_VALUE = 'EXPENSE_VALUE';
export const DELETE = 'DELETE';

export const submit = (payload) => ({ type: SUBMIT, payload });

export const currencies = (state) => ({
  type: CURRENCIE, state,
});

export const getCurrencie = () => async (dispatch) => {
  const promise = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await promise.json();
  const currencieValue = Object.keys(data).filter((key) => key !== 'USDT');

  dispatch(currencies(currencieValue));
};

export const expensesValue = (expenses) => ({
  type: EXPENSE_VALUE,
  expenses,
});

export const getPrice = (newExpense) => async (dispatch) => {
  const promise = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await promise.json();
  newExpense.exchangeRates = data;
  dispatch(expensesValue(newExpense));
};

export const deleteExpense = (value) => ({
  type: DELETE,
  value,
});
