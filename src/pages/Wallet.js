import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrencie } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { currencies } = this.props;
    currencies();
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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  wallet: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  currencies: () => dispatch(getCurrencie()),

});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currencies: PropTypes.func.isRequired,
  wallet: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
