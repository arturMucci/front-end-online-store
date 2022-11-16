import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../styles/navbar.css';
import logo from '../images/logo.png';

export default class Navbar extends Component {
  render() {
    const { handleChange, inputSearch, productsAPI, cart } = this.props;
    const mainPage = handleChange ? 'block' : 'none';
    return (
      <header className="header-content">
        <form
          className="form-search"
          style={ { display: mainPage } }
        >
          <label htmlFor="home-initial-message">
            <input
              className="search-input"
              onChange={ handleChange }
              placeholder="Digite o que você busca"
              value={ inputSearch }
              type="text"
              id="home-initial-message"
              data-testid="query-input"
            />
            <input
              className="searchButton"
              type="button"
              data-testid="query-button"
              onClick={ productsAPI }
            />
          </label>
        </form>
        <div className="logo-content">
          <img className="logo" alt="logo" src={ logo } />
        </div>
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
      </header>
    );
  }
}

Navbar.propTypes = {
  handleChange: PropTypes.func,
  inputSearch: PropTypes.string,
  productsAPI: PropTypes.func,
  cart: PropTypes.arrayOf(PropTypes.object),
}.isRequired;
