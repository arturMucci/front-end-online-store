import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../styles/cartProduct.css';

export default class CartProduct extends Component {
  state = {
    quantity: '1',
  };

  componentDidMount() {
    // const { quantity } = this.props;
    // this.setState({ quantity });
  }

  handleAmount = ({ target }) => {
    const { available_quantity: availableQuantity } = this.props;
    const { id } = target;
    const { quantity } = this.state;
    if (id === 'minus' && Number(quantity) > 1) {
      this.setState({ quantity: Number(quantity) - 1 });
    } else if (id === 'plus' && quantity < availableQuantity) {
      this.setState({ quantity: Number(quantity) + 1 });
    }
    if (id === 'quantityProd' && Number(quantity) >= 1) {
      const { value } = target;
      this.setState({ quantity: value });
    }
  };

  removeProduct = ({ target }) => {
    const { updateItems } = this.props;
    const { value } = target;
    const cartItemsSaved = JSON.parse(localStorage.getItem('cartItems'));
    const newCartItems = cartItemsSaved.filter((item) => item.id !== value);
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    updateItems(newCartItems);
  };

  render() {
    const { quantity } = this.state;
    const { thumbnail, title, price, id } = this.props;
    return (
      <div>
        <button
          type="button"
          className="btn-remove"
          data-testid="remove-product"
          value={ id }
          onClick={ this.removeProduct }
        >
          X
          {/* <i className="fa-solid fa-xmark" /> */}
        </button>
        <img src={ thumbnail } alt={ title } />
        <p
          data-testid="shopping-cart-product-name"
        >
          { title }
        </p>
        <label htmlFor="minus">
          {' '}
          <i className="fa-solid fa-minus" />
          <input
            className="btn-iteration minus"
            type="button"
            id="minus"
            onClick={ this.handleAmount }
            data-testid="product-decrease-quantity"
          />
        </label>
        <label htmlFor="quantityProd">
          <input
            className="amount"
            type="number"
            value={ quantity }
            id="quantityProd"
            onChange={ this.handleAmount }
          />
        </label>
        <label htmlFor="plus">
          {' '}
          <i className="fa-solid fa-plus" />
          <input
            className="btn-iteration plus"
            type="button"
            id="plus"
            onClick={ this.handleAmount }
            data-testid="product-increase-quantity"
          />
        </label>
        <p>
          <span data-testid="shopping-cart-product-quantity">{ quantity }</span>
          x
          <span>{ price }</span>
        </p>
      </div>
    );
  }
}

CartProduct.propTypes = {
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  updateItems: PropTypes.func,
}.isRequired;
