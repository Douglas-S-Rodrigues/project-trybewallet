import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submit } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      btnDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value }, () => {
      this.validate();
    });
  }

  validate = () => {
    this.setState({
      btnDisabled: true,
    });
    const { password, email } = this.state;
    const MIN_LENGH = 6;
    const EMAIL_VALID_FORMAT = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (password.length >= MIN_LENGH && email.match(EMAIL_VALID_FORMAT)) {
      this.setState({
        btnDisabled: false,
      });
    }
  }

  handleClik = () => {
    const { history } = this.props;
    const { loginTrue } = this.props;
    loginTrue(this.state);
    history.push('/carteira');
  }

  render() {
    const { email, password, btnDisabled } = this.state;
    return (
      <div>
        <label htmlFor="email">
          E-mail:
          <input
            type="text"
            data-testid="email-input"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        Senha:
        <label htmlFor="psswd">
          <input
            type="password"
            id="psswd"
            data-testid="password-input"
            name="password"
            value={ password }
            onChange={ this.handleChange }
          />
        </label>
        <button
          disabled={ btnDisabled }
          onClick={ this.handleClik }
          type="button"
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginTrue: (info) => dispatch(submit(info)),
});

Login.propTypes = {
  loginTrue: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
