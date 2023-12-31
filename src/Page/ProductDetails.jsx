/* eslint-disable jsx-a11y/control-has-associated-label */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getProductById } from '../services/api';
import Navbar from '../Components/Navbar';
import '../styles/productDetails.css';

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
        <Navbar
          cart={ cart }
        />
        <div className="product-detail-content">
          <div className="product-title-content">
            <h4 data-testid="product-detail-name">{ title }</h4>
            <img data-testid="product-detail-image" src={ thumbnail } alt={ title } />
            {freeShipping && <p data-testid="free-shipping">Frete Grátis!</p>}
          </div>
          <div className="product-info-content">
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
        </div>
      </div>

    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.func.isRequired,
};
