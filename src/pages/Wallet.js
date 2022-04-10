import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrencie } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { currencies } = this.props;
    currencies();
  }

  handlechange() {
    const { currencyValues } = this.props;
    if (currencyValues !== undefined) {
      return currencyValues.map((cambio) => (
        <option key={ cambio }>{ cambio }</option>
      ));
    }
  }

  render() {
    const { email, wallet } = this.props;
    return (
      <div>
        <header>
          <p data-testid="email-field">
            { email }
          </p>
          <p data-testid="total-field">
            0
          </p>
          <p data-testid="header-currency-field">
            BRL
          </p>
        </header>
        <select>
          { wallet.map((info) => (<option key={ info }>{info}</option>)) }
        </select>
        <form>
          <label htmlFor="value-input">
            Valor
            <input type="number" data-testid="value-input" name="value-input" />
          </label>
          <label htmlFor="description-input">
            Descrição
            <input type="text" data-testid="description-input" name="description-input" />
          </label>
          <label htmlFor="currency-input">
            Moeda
            <select
              name="currency-input"
              data-testid="currency-input"
              id="currency-input"
            >
              { this.handlechange() }
            </select>
          </label>
          <label htmlFor="method-input">
            Método
            <select name="method-input" data-testid="method-input">
              <option name="dinheiro">Dinheiro</option>
              <option name="cartaocred">Cartão de crédito</option>
              <option name="cartaodeb">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag-input">
            Despesa
            <select name="tag-input" data-testid="tag-input">
              <option name="alimentacao">Alimentação</option>
              <option name="lazer">Lazer</option>
              <option name="trabalho">Trabalho</option>
              <option name="transporte">Transporte</option>
              <option name="saude">Saúde</option>
            </select>
          </label>
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
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  wallet: state.wallet.currencies,
  currencyValues: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  currencies: () => dispatch(getCurrencie()),

});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currencies: PropTypes.func.isRequired,
  wallet: PropTypes.arrayOf(PropTypes.any).isRequired,
  currencyValues: PropTypes.node.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
