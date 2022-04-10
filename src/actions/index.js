export const SUBMIT = 'SUBMIT';
export const CURRENCIE = 'CURRENCIE';
export const EXPENSE_VALUE = 'EXPENSE_VALUE';

export const submit = (payload) => ({ type: SUBMIT, payload });

export const currencies = (payload) => ({ type: CURRENCIE, payload });

export const getCurrencie = () => async (dispatch) => {
  const promise = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await promise.json();

  const currencieValue = Object.keys(data).filter((info) => !info.includes('USDT'));

  dispatch(currencies(currencieValue));
};

export const expenses = (expense) => ({
  type: EXPENSE_VALUE,
  expense,
});

export const getPrice = (newExpense) => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  newExpense.exchangeRates = data;
  dispatch(expenses(newExpense));
};
