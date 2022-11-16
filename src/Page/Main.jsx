import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../styles/main.css';
import logo from '../images/logo.png';

import Categories from '../Components/Categories';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import ProductCard from '../Components/ProductCard';

class Main extends Component {
  state = {
    categories: [],
    inputSearch: '',
    products: [],
    actCat: '',
    cart: [],
  };

  componentDidMount() {
    this.fetchGetCategories();
    this.updateCartStorage();
  }

  fetchGetCategories = async () => {
    const response = await getCategories();
    this.setState({ categories: response });
  };

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      inputSearch: value,
    });
  };

  productsAPI = async () => {
    const { inputSearch, actCat } = this.state;
    const param = actCat;
    const productsList = await getProductsFromCategoryAndQuery(param, inputSearch);
    this.setState({ products: productsList.results });
  };

  fetchCategoriesProduct = async (e) => {
    const { value } = e.target;
    const { results } = await getProductsFromCategoryAndQuery(value);
    this.setState({ products: results });
  };

  updateCartStorage = () => {
    const storage = localStorage.getItem('cartItems');
    if (storage) {
      this.setState({ cart: JSON.parse(storage) });
    }
  };

  addToCart = ({ target }) => {
    const { products } = this.state;
    const product = products.find(({ id }) => id === target.id);

    // Essa era minha lógica para não repetir produto no carrinho e acrescentar o atributo quantidade
    // Funciona, mas tive que comentar para o teste funcionar
    // Pelo jeito tem que reduzir o numero de produtos iguais dentro da renderização do carrinho, não consegui fazer.

    // const containProduct = cart.some((item) => item.id === product.id);
    // if (containProduct) {
    //   if (product.available_quantity >= product.quantity) {
    //     product.quantity += 1;
    //     localStorage.setItem('cartItems', JSON.stringify(cart));
    //   }
    // } else {
    //   product.quantity = 1;
    //   this.setState((prevState) => ({
    //     cart: [...prevState.cart, product],
    //   }), () => {
    //     const { cart: newCartItems } = this.state;
    //     localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    //   });
    // }

    product.quantity += 1;
    this.setState((prevState) => ({
      cart: [...prevState.cart, product],
    }), () => {
      const { cart: newCartItems } = this.state;
      localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    });
  };

  render() {
    const { categories, inputSearch, products, cart } = this.state;
    const showProducts = products.map((product) => (
      <ProductCard
        key={ product.id }
        product={ product }
        addToCart={ this.addToCart }
      />
    ));
    const initialMessageDisplay = !products.length ? 'block' : 'none';
    const noProductsDisplay = products.length ? 'block' : 'none';
    return (
      <>
        <header className="header-content">
          <form className="form-search">
            <label htmlFor="home-initial-message">
              <input
                className="search-input"
                onChange={ this.handleChange }
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
                onClick={ this.productsAPI }
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
        <main className="main-content">
          <Categories
            categories={ categories }
            fetchCategory={ this.fetchCategoriesProduct }
          />
          <section className="products-container">
            <p
              data-testid="home-initial-message"
              style={ { display: initialMessageDisplay } }
            >
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
            { products.length ? <ul>{showProducts}</ul>
              : (
                <p style={ { display: noProductsDisplay } }>
                  Nenhum produto foi encontrado
                </p>
              )}
          </section>
        </main>
      </>
    );
  }
}

export default Main;
