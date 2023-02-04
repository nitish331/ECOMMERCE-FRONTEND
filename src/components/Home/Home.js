import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import MetaData from "../layouts/MetaData";
import "./Home.css";
import Product from "./Product";
import { clearErrors, getProducts } from "../../actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layouts/Loader/Loader";
import { useAlert } from "react-alert";
const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, products, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProducts());
  }, [dispatch, error, alert]);
  return (
    <>
      <MetaData title={"ECOMMERCE"} />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="banner">
            <p>WELCOME TO ECOMMERCE</p>
            <h1>FIND THE TRENDING PRODUCTS BELOW</h1>
            <a href={"#container"}>
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>
          <h2 className="homeHeading">Featured Products</h2>
          <div className="container" id="container">
            {products && products.map((prod) => <Product product={prod} />)}
          </div>
        </Fragment>
      )}
    </>
  );
};

export default Home;
