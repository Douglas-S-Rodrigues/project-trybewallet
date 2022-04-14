import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrencie, getPrice } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: '',
    };
  }

  componentDidMount() {
    const { currencie } = this.props;

    currencie();
  }

  handleChange = ({ target: { id, value } }) => {
    this.setState({
      [id]: value,
    });
  }

  handleClick = () => {
    const { id } = this.state;
    const { setExpenses } = this.props;

    setExpenses(this.state);
    this.setState({
      id: id + 1,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: '',
    });
  }

  render() {
    const { email, currencies, expenses, expensesInfo } = this.props;
    const { value, currency, description, method, tag } = this.state;
    const total = expenses.reduce((accumulatedValue, currentValue) => {
      accumulatedValue += currentValue.value * Number(
        currentValue.exchangeRates[currentValue.currency].ask,
      );
      return accumulatedValue;
    }, 0);
    return (
      <div>
        <header>
          <p data-testid="email-field">
            { email }
          </p>
          <p data-testid="total-field">
            { total.toFixed(2) }
          </p>
          <p data-testid="header-currency-field">
            BRL
          </p>
        </header>
        <form>
          <label htmlFor="value">
            Valor
            <input
              type="text"
              id="value"
              value={ value }
              data-testid="value-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description">
            Descrição
            <input
              type="text"
              id="description"
              value={ description }
              data-testid="description-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currency">
            Moeda
            <select
              value={ currency }
              id="currency"
              onChange={ this.handleChange }
            >
              {
                currencies.map((currencie) => (
                  <option value={ currencie } key={ currencie }>{ currencie }</option>
                ))
              }
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento
            <select
              id="method"
              value={ method }
              data-testid="method-input"
              onChange={ this.handleChange }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Categoria
            <select
              id="tag"
              value={ tag }
              data-testid="tag-input"
              onChange={ this.handleChange }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <button
            type="button"
            onClick={ this.handleClick }
          >
            Adicionar despesa
          </button>
        </form>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expensesInfo.length > 0
            && expensesInfo.map((expense) => (
              <tr key={ expense.id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{(expense.value * 1).toFixed(2)}</td>
                <td>{expense.exchangeRates[expense.currency].name}</td>
                <td>{(expense.exchangeRates[expense.currency].ask * 1).toFixed(2)}</td>
                <td>
                  {(expense.value * expense.exchangeRates[expense.currency].ask).toFixed(2)}
                </td>
                <td>Real</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  expensesInfo: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  currencie: (state) => dispatch(getCurrencie(state)),
  setExpenses: (state) => dispatch(getPrice(state)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currencie: PropTypes.func.isRequired,
  setExpenses: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(String).isRequired,
  expenses: PropTypes.arrayOf(String).isRequired,
  expensesInfo: PropTypes.arrayOf(String).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
