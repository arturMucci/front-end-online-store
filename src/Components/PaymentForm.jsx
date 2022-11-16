import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class PaymentForm extends Component {
  render() {
    const { state, handleChange, verifySubmitBtn, errorMessage } = this.props;
    const {
      inputName,
      inputEmail,
      inputCpf,
      inputAddress,
      inputCep,
      inputTel,
      paymentMethod,
    } = state;
    return (
      <div>
        <p>Informações do comprador</p>
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
              onChange={ handleChange }
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
              onChange={ handleChange }
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
              onChange={ handleChange }
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
              onChange={ handleChange }
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
              onChange={ handleChange }
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
              onChange={ handleChange }
              required
            />
          </label>
          <div>
            <p>Método de pagamento:</p>
            <label htmlFor="boleto">
              Boleto
              <input
                type="radio"
                data-testid="ticket-payment"
                value="boleto"
                id="boleto"
                name="paymentMethod"
                checked={ paymentMethod === 'boleto' }
                onChange={ handleChange }
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
                onChange={ handleChange }
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
                onChange={ handleChange }
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
                onChange={ handleChange }
                required
              />
            </label>
          </div>
          <button
            data-testid="checkout-btn"
            type="submit"
            onClick={ verifySubmitBtn }
          >
            Comprar
          </button>
        </form>
      </div>
    );
  }
}
PaymentForm.propTypes = {
  state: PropTypes.shape({
    inputName: PropTypes.string.isRequired,
    inputEmail: PropTypes.string.isRequired,
    inputCpf: PropTypes.string.isRequired,
    inputAddress: PropTypes.string.isRequired,
    inputCep: PropTypes.string.isRequired,
    inputTel: PropTypes.string.isRequired,
    paymentMethod: PropTypes.string.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  verifySubmitBtn: PropTypes.func.isRequired,
  errorMessage: PropTypes.bool.isRequired,
};
