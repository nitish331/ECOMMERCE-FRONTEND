import "./App.css";
import Header from "./components/layouts/Header/Header";
import WebFont from "webfontloader";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import Footer from "./components/layouts/Footer/Footer";
import Home from "./components/Home/Home.js";
import ProductDetails from "./components/Product/ProductDetails.js";
import Products from "./components/Products/Products.js";
import Search from "./components/Products/Search.js";
import LoginSignUp from "./components/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userActions";
import UserOptions from "./components/layouts/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./components/User/Profile.js";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import UpdateProfile from "./components/User/UpdateProfile.js";
import UpdatePassword from "./components/User/UpdatePassword.js";
import ForgotPassword from "./components/User/ForgotPassword.js";
import ResetPassword from "./components/User/ResetPassword.js";
import Cart from "./components/Cart/Cart.js";
import Shipping from "./components/Cart/Shipping.js";
import ConfirmOrder from "./components/Cart/ConfirmOrder.js";
import axios from "axios";
import Payment from "./components/Cart/Payment.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/Cart/OrderSuccess.js";
import MyOrders from "./components/Order/MyOrders.js";
import OrderDetails from "./components/Order/OrderDetails.js";
import Dashboard from "./components/Admin/Dashboard.js";
import ProductsList from "./components/Admin/ProductsList.js";
import NewProduct from "./components/Admin/NewProduct";
import UpdateProduct from "./components/Admin/UpdateProduct.js";
import OrderList from "./components/Admin/OrderList.js";
import ProcessOrder from "./components/Admin/ProcessOrder.js";
import UserList from "./components/Admin/UserList.js";
import UpdateUser from "./components/Admin/UpdateUser.js";
import ProductReviews from "./components/Admin/ProductReviews.js";
import Contact from "./components/layouts/Contact/Contact";
import About from "./components/layouts/About/About";
import NotFound from "./components/layouts/NotFound/NotFound";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Drold Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  return (
    <div className="App">
      <Router>
        <Header />
        {isAuthenticated && <UserOptions user={user} />}
        {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <ProtectedRoute exact path="/process/payment" component={Payment} />
          </Elements>
        )}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/login" element={<LoginSignUp />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/password/forgot" element={<ForgotPassword />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route
            exact
            path="/password/reset/:token"
            element={<ResetPassword />}
          />
          <Route
            element={
              window.location.pathname === "/process/payment" ? null : (
                <NotFound />
              )
            }
          />
        </Routes>
        <ProtectedRoute exact path="/account" component={Profile} />
        <ProtectedRoute exact path="/me/update" component={UpdateProfile} />

        <ProtectedRoute exact path="/shipping" component={Shipping} />

        <ProtectedRoute exact path="/success" component={OrderSuccess} />

        <ProtectedRoute exact path="/orders" component={MyOrders} />
        <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/dashboard"
          component={Dashboard}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/products"
          component={ProductsList}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/orders"
          component={OrderList}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/users"
          component={UserList}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/reviews"
          component={ProductReviews}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/user/:id"
          component={UpdateUser}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/order/:id"
          component={ProcessOrder}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/product"
          component={NewProduct}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/product/:id"
          component={UpdateProduct}
        />

        <ProtectedRoute
          exact
          path="/orderdetails/:id"
          component={OrderDetails}
        />

        <ProtectedRoute
          exact
          path="/password/update"
          component={UpdatePassword}
        />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
