export const SUBMIT = 'SUBMIT';

export const submit = (payload) => ({ type: SUBMIT, payload });

export const CURRENCIE = 'CURRENCIE';
export const currencies = (payload) => ({ type: CURRENCIE, payload });

export const getCurrencie = () => async (dispatch) => {
  const promise = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await promise.json();
  const currencieValue = Object.keys(data).filter((info) => !info.includes('USDT'));

  dispatch(currencies(currencieValue));
};
