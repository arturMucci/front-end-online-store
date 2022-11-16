import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/categories.css';

export default class Categories extends Component {
  render() {
    const { categories, fetchCategory } = this.props;
    return (
      <section className="categories-menu">
        {categories.map(({ name, id }) => (
          <button
            key={ id }
            type="button"
            data-testid="category"
            value={ id }
            className="categories"
            onClick={ fetchCategory }
          >
            {name}
          </button>))}
      </section>
    );
  }
}
Categories.propTypes = {
  categories: PropTypes.array,
  fetchCategory: PropTypes.func,
}.isRequired;
