/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/productDetails.css';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';

export default class ProductDetails extends Component {
  state = {
    product: {},
    cart: [],
  };

  componentDidMount() {
    const { match: { params: { id } = {} } = {} } = this.props;
    this.getProduct(id);
    this.getCartProductsStored();
  }

  getProduct = async (id) => {
    const product = await getProductById(id);
    this.setState({
      product,
    });
  };

  getCartProductsStored = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    this.setState({ cart: cartItems });
  };

  addToCart = () => {
    const { product } = this.state;
    product.quantity += 1;
    this.setState((prevState) => ({
      cart: [...prevState.cart, product],
    }), () => {
      const { cart: newCartItems } = this.state;
      localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    });
  };

  render() {
    const {
      cart,
      product: {
        title,
        price,
        thumbnail,
        shipping: { free_shipping: freeShipping } = {} } } = this.state;

    return (
      <div className="prodDetail-container">
        <nav className="nav-content">
          <div className="cart-button">
            <Link to="/cart" data-testid="shopping-cart-button">
              <p
                className="cart-counter"
                data-testid="shopping-cart-size"
              >
                { cart.length }
              </p>
              <i className="fa-solid fa-cart-shopping" />
            </Link>
          </div>
        </nav>
        {freeShipping && <p data-testid="free-shipping">Frete Grátis!</p>}
        <h4 data-testid="product-detail-name">{ title }</h4>
        <img data-testid="product-detail-image" src={ thumbnail } alt={ title } />
        <p data-testid="product-detail-price">
          { price }
        </p>
        <button
          data-testid="product-detail-add-to-cart"
          id="button-add-to-cart"
          name="button-add-to-cart"
          type="button"
          onClick={ this.addToCart }
        >
          Adicionar ao carrinho
        </button>
      </div>

    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.func.isRequired,
};
