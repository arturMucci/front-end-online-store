import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../styles/checkout.css';
import ProductCard from '../Components/ProductCard';

class Checkout extends Component {
  state = {
    inputName: '',
    inputEmail: '',
    inputCpf: '',
    inputTel: '',
    inputCep: '',
    inputAddress: '',
    paymentMethod: '',
    errorMessage: false,
  };

  componentWillUnmount() {
    localStorage.setItem('cartItems', '[]');
  }

  verifySubmitBtn = () => {
    const {
      inputName,
      inputEmail,
      inputCpf,
      inputAddress,
      inputCep,
      inputTel,
      paymentMethod,
    } = this.state;

    const filledFields = inputName
    && inputEmail
    && inputCpf
    && inputAddress
    && inputCep
    && inputTel
    && paymentMethod;

    const { history } = this.props;

    if (!filledFields) {
      this.setState({ errorMessage: true });
    } else {
      history.push('/');
    }
  };

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const cartProducts = JSON.parse(localStorage.getItem('cartItems'));
    const {
      inputName,
      inputEmail,
      inputCpf,
      inputAddress,
      inputCep,
      inputTel,
      paymentMethod,
      errorMessage,
    } = this.state;
    return (
      <div className="checkout-container">
        {
          cartProducts.map(
            (product) => (
              <ProductCard
                product={ product }
                key={ product.id }
                isCheckout
              />),
          )
        }
        <form>
          {errorMessage && <p data-testid="error-msg">Campos inválidos</p>}
          <label
            htmlFor="checkout-fullname"
          >
            Nome Completo
            <input
              type="text"
              id="checkout-fullname"
              name="inputName"
              data-testid="checkout-fullname"
              value={ inputName }
              onChange={ this.handleChange }
              required
            />
          </label>
          <label
            htmlFor="checkout-email"
          >
            Email
            <input
              type="email"
              id="checkout-email"
              name="inputEmail"
              data-testid="checkout-email"
              value={ inputEmail }
              onChange={ this.handleChange }
              required
            />
          </label>
          <label
            htmlFor="checkout-cpf"
          >
            CPF
            <input
              type="text"
              id="checkout-cpf"
              name="inputCpf"
              data-testid="checkout-cpf"
              value={ inputCpf }
              onChange={ this.handleChange }
              required
            />
          </label>
          <label
            htmlFor="checkout-phone"
          >
            Telefone
            <input
              type="tel"
              id="checkout-phone"
              name="inputTel"
              data-testid="checkout-phone"
              value={ inputTel }
              onChange={ this.handleChange }
              required
            />
          </label>
          <label
            htmlFor="checkout-cep"
          >
            CEP
            <input
              type="text"
              id="checkout-cep"
              name="inputCep"
              data-testid="checkout-cep"
              value={ inputCep }
              onChange={ this.handleChange }
              required
            />
          </label>
          <label
            htmlFor="checkout-address"
          >
            Endereço
            <input
              type="text"
              id="checkout-address"
              name="inputAddress"
              data-testid="checkout-address"
              value={ inputAddress }
              onChange={ this.handleChange }
              required
            />
          </label>
          <div>
            <p>Formas de pagamento:</p>
            <label htmlFor="boleto">
              Boleto
              <input
                type="radio"
                data-testid="ticket-payment"
                value="boleto"
                id="boleto"
                name="paymentMethod"
                checked={ paymentMethod === 'boleto' }
                onChange={ this.handleChange }
                required
              />
            </label>
            <br />
            <label htmlFor="visa">
              Visa
              <input
                type="radio"
                data-testid="visa-payment"
                value="visa"
                id="visa"
                name="paymentMethod"
                checked={ paymentMethod === 'visa' }
                onChange={ this.handleChange }
                required
              />
            </label>
            <br />
            <label htmlFor="master">
              MasterCard
              <input
                type="radio"
                data-testid="master-payment"
                value="master"
                id="master"
                name="paymentMethod"
                checked={ paymentMethod === 'master' }
                onChange={ this.handleChange }
                required
              />
            </label>
            <br />
            <label htmlFor="elo">
              Elo
              <input
                type="radio"
                data-testid="elo-payment"
                value="elo"
                id="elo"
                name="paymentMethod"
                checked={ paymentMethod === 'elo' }
                onChange={ this.handleChange }
                required
              />
            </label>
          </div>
          <button
            data-testid="checkout-btn"
            type="submit"
            onClick={ this.verifySubmitBtn }
          >
            Comprar
          </button>
        </form>
      </div>
    );
  }
}
Checkout.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};
export default Checkout;
