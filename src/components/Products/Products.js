import React, { useEffect, useState } from "react";
import "./Products.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layouts/Loader/Loader";
import Product from "../Home/Product";
import { clearErrors, getProducts } from "../../actions/productActions";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { useAlert } from "react-alert";
import MetaData from "../layouts/MetaData";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const Products = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductCount,
  } = useSelector((state) => state.products);

  const { keyword } = useParams();

  const [currentPage, setCurrentPage] = useState(1);

  const [price, setPrice] = useState([0, 25000]);

  const [Category, setCategory] = useState("");

  const [ratings, setRatings] = useState(0);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newprice) => {
    setPrice(newprice);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProducts(keyword, currentPage, price, Category, ratings));
  }, [dispatch, keyword, currentPage, price, Category, ratings, alert, error]);

  let count = filteredProductCount;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"Products---ECOMMERCE"} />
          <h1 className="productsHeading">Products</h1>
          <div className="products">
            {products &&
              products.map((prod) => (
                <Product key={products._id} product={prod} />
              ))}
          </div>
          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              area-lablledby="range-slider"
              valueLabelDisplay="auto"
              onChange={priceHandler}
              min={0}
              max={25000}
            />
            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
            <fieldset>
              <Typography component={"legend"}>Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => setRatings(newRating)}
                area-lablledby="continous-slider"
                min={0}
                max={5}
                valueLabelDisplay="auto"
              />
            </fieldset>
          </div>
          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText={"Prev"}
                firstPageText={"1st"}
                lastPageText="last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Products;
