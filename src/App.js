import React from "react";
import Navi from "./Navi";
import CategoryList from "./CategoryList";
import ProductList from "./ProductList";
import NotFound from "./NotFound";
import CartList from "./CartList";
import FormDemo1 from "./FormDemo1";
import FormDemo2 from "./FormDemo2";
import { Container, Row, Col } from "reactstrap";
import { Component } from "react";
import alertify from "alertifyjs";
import { Switch, Route } from "react-router-dom";

class App extends Component {
  state = {
    currentCategory: "",
    products: [],
    cart: [],
  };

  componentDidMount() {
    this.getProducts();
  }

  getProducts = (categoryId) => {
    let url = "http://localhost:3000/products";
    if (categoryId) {
      url += "?categoryId=" + categoryId;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => this.setState({ products: data }));
  };

  changeCurrentCategory = (category) => {
    this.setState({ currentCategory: category.categoryName });
    this.getProducts(category.id);
  };

  addToCart = (product) => {
    let newCart = this.state.cart;
    let addedItem = newCart.find((c) => c.product.id === product.id);
    if (addedItem) {
      addedItem.quantity += 1;
    } else {
      newCart.push({ product: product, quantity: 1 });
    }

    this.setState({ cart: newCart });
    alertify.success(product.productName + " added to cart!", 1);
  };

  removeFromCart = (product) => {
    let newCart = this.state.cart.filter((c) => c.product.id !== product.id);
    this.setState({ cart: newCart });
    alertify.error(product.productName + " removed from cart!", 1);
  };

  render() {
    let myCatInfo = { title: "CategoryListt", name: "catList" };
    let myProInfo = { title: "ProductList", name: "proList" };
    return (
      <div>
        <Container>
          <Navi remove={this.removeFromCart} cart={this.state.cart}></Navi>
          <Row>
            <Col xs="4">
              <CategoryList
                currentCategory={this.state.currentCategory}
                changeCategory={this.changeCurrentCategory}
                info={myCatInfo}
              ></CategoryList>
            </Col>
            <Col xs="8">
              <Switch>
                <Route
                  exact
                  path="/"
                  render={(props) => (
                    <ProductList
                      {...props}
                      addToCart={this.addToCart}
                      products={this.state.products}
                      currentCategory={this.state.currentCategory}
                      info={myProInfo}
                    ></ProductList>
                  )}
                ></Route>
                <Route
                  exact
                  path="/cart"
                  render={(props) => (
                    <CartList
                      {...props}
                      cart={this.state.cart}
                      remove={this.removeFromCart}
                    ></CartList>
                  )}
                ></Route>
                <Route exact path="/form1" component={FormDemo1}></Route>
                <Route exact path="/form2" component={FormDemo2}></Route>
                <Route component={NotFound}></Route>
              </Switch>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
