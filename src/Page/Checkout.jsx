import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../styles/checkout.css';
import ProductCard from '../Components/ProductCard';
import PaymentForm from '../Components/PaymentForm';

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
    //   inputName,
    //   inputEmail,
    //   inputCpf,
    //   inputAddress,
    //   inputCep,
    //   inputTel,
    //   paymentMethod,
      errorMessage,
    } = this.state;
    return (
      <div className="checkout-container">
        <div>
          <p>Revise seus pedidos</p>
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
          <p>
            Total: R$
            {cartProducts
              .reduce((previousValue, currentValue) => (
                previousValue + currentValue.price), 0)}
          </p>
        </div>
        <div>
          <PaymentForm
            handleChange={ this.handleChange }
            state={ this.state }
            verifySubmitBtn={ this.verifySubmitBtn }
            errorMessage={ errorMessage }
          />
        </div>
      </div>
    );
  }
}
Checkout.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};
export default Checkout;
