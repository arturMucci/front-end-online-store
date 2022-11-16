import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from '../Page/Main';
import Cart from '../Page/Cart';
import ProductDetails from '../Page/ProductDetails';
import Checkout from '../Page/Checkout';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={ () => <Main /> } />
        <Route exact path="/cart" render={ (props) => <Cart { ...props } /> } />
        <Route exact path="/productdetails/:id" component={ ProductDetails } />
        <Route exact path="/checkout" component={ Checkout } />
      </Switch>
    );
  }
}

export default Routes;
