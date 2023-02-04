import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layouts/MetaData";
import "./Search.css";

const Search = () => {
  const history = useNavigate();
  const [keyword, setKeyword] = useState("");
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history(`/products/${keyword}`);
    } else {
      history("/products");
    }
  };
  return (
    <>
      <MetaData title={"Search A Product ---ECOMMERCE"} />
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type={"text"}
          placeholder="Search Your Favourate Product"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type={"submit"} value={"Search"} />
      </form>
    </>
  );
};

export default Search;
