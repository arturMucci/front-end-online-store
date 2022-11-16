import React, { Component } from 'react';
import '../styles/cart.css';
import PropTypes from 'prop-types';
import CartProduct from '../Components/CartProduct';

class Cart extends Component {
  state = {
    products: [],
  };

  componentDidMount() {
    this.getSavedItems();
  }

  getSavedItems = () => {
    const storage = JSON.parse(localStorage.getItem('cartItems')) || [];
    // Minha lógica era verificar os objetos que se repetem e adicionar a quatidade de repetição como atributo
    // No final, retornar um novo array sem produtos repetidos e com o numero de quantidade como atributo
    // Não consegui fazer mas aqui fica um código que eu tava tentando

    // const filtered = storage.map((item) => {
    //   const equalObjs = storage.filter((itemFilt) => itemFilt.id === item.id).length > 1;
    //   if (equalObjs) {
    //     item.quantity += 1;
    //     return item;
    //   }
    //   return item;
    // });
    // console.log(filtered);

    this.setState({ products: storage });
  };

  updateItems = (obj) => {
    this.setState({ products: obj });
  };

  productsList = () => {
    const { products } = this.state;
    return products.map((product) => (<CartProduct
      { ...product }
      key={ product.id }
      updateItems={ this.updateItems }
    />));
  };

  redirectToCheckout = () => {
    const { history } = this.props;
    history.push('/checkout');
  };

  render() {
    const { products } = this.state;
    const emptyCartText = (
      <h1 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h1>
    );

    return (
      <div className="cart-container">
        { products.length === 0 ? emptyCartText
          : this.productsList()}
        <button
          type="button"
          data-testid="checkout-products"
          onClick={ this.redirectToCheckout }
        >
          Finalizar compra
        </button>
      </div>
    );
  }
}
Cart.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};
export default Cart;
